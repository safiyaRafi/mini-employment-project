const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini Employee Management API',
            version: '1.0.0',
            description: 'API documentation for the Employee Management Portal',
            contact: {
                name: 'Developer',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Local Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Employee: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'position', 'department', 'salary', 'dateOfJoining'],
                    properties: {
                        id: { type: 'string', description: 'Auto-generated ID' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        position: { type: 'string' },
                        department: { type: 'string' },
                        salary: { type: 'number' },
                        dateOfJoining: { type: 'string', format: 'date-time' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        username: { type: 'string' },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        paths: {
            '/auth/login': {
                post: {
                    summary: 'Login as Admin',
                    tags: ['Auth'],
                    security: [],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['username', 'password'],
                                    properties: {
                                        username: { type: 'string', default: 'admin' },
                                        password: { type: 'string', default: 'admin123' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Successful login',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string' },
                                            user: { $ref: '#/components/schemas/User' },
                                        },
                                    },
                                },
                            },
                        },
                        401: { description: 'Invalid credentials' },
                    },
                },
            },
            '/dashboard': {
                get: {
                    summary: 'Get Dashboard Statistics',
                    tags: ['Dashboard'],
                    responses: {
                        200: {
                            description: 'Dashboard stats',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            totalEmployees: { type: 'integer' },
                                            recentEmployees: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Employee' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/employees': {
                get: {
                    summary: 'Get All Employees',
                    tags: ['Employees'],
                    parameters: [
                        { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
                        { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 } },
                        { in: 'query', name: 'search', schema: { type: 'string' } },
                    ],
                    responses: {
                        200: {
                            description: 'List of employees',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            employees: { type: 'array', items: { $ref: '#/components/schemas/Employee' } },
                                            total: { type: 'integer' },
                                            page: { type: 'integer' },
                                            pages: { type: 'integer' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    summary: 'Create New Employee',
                    tags: ['Employees'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Employee' },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Employee created' },
                    },
                },
            },
            '/employees/{id}': {
                put: {
                    summary: 'Update Employee',
                    tags: ['Employees'],
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Employee' },
                            },
                        },
                    },
                    responses: {
                        200: { description: 'Employee updated' },
                    },
                },
                delete: {
                    summary: 'Delete Employee',
                    tags: ['Employees'],
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
                    ],
                    responses: {
                        200: { description: 'Employee deleted' },
                    },
                },
            },
        },
    },
    apis: [], // No file scanning needed as paths are defined here
};

const specs = swaggerJsdoc(options);
module.exports = specs;
