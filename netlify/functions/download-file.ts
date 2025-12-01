import { Handler } from '@netlify/functions';
import { readFile } from 'fs/promises';
import { join } from 'path';

const handler: Handler = async (event) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        // Get filename from query parameter
        const filename = event.queryStringParameters?.file;

        if (!filename) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'File parameter is required' }),
            };
        }

        // Security: Prevent directory traversal attacks
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return {
                statusCode: 403,
                body: JSON.stringify({ error: 'Invalid file name' }),
            };
        }

        // Define the bundle directory path (relative to project root)
        const bundlePath = join(process.cwd(), 'bundle', filename);

        // Read the file
        const fileBuffer = await readFile(bundlePath);

        // Determine content type based on file extension
        const ext = filename.toLowerCase().split('.').pop();
        let contentType = 'application/octet-stream';

        if (ext === 'pdf') {
            contentType = 'application/pdf';
        } else if (ext === 'docx') {
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        }

        // Return the file
        return {
            statusCode: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-cache',
            },
            body: fileBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error('❌ Error downloading file:', error);

        // Check if file not found
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'File not found' }),
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to download file',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
        };
    }
};

export { handler };
