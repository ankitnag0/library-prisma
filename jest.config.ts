export default {
    // other Jest config options...

    // set the NODE_ENV environment variable to 'test'
    testEnvironment: 'node',
    testEnvironmentOptions: {
        env: {
            NODE_ENV: 'test',
        },
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'jest-esbuild',
    },
};
