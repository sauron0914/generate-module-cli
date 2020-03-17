const aliasPaths = require('../paths').compilerOptions.paths
const path = require('path')
const fs = require('fs')
const { overrideDevServer } = require('customize-cra')
const { backendUrl } = require('../src/config/config')

function resolve(...args) {
    return path.resolve(fs.realpathSync(process.cwd()), ...args)
}

const addAlias = config => {
    config.resolve.alias = {
        ...config.resolve.alias,
        ...Object.entries(aliasPaths).reduce(
            (pre, [key, value]) => ({
                ...pre,
                [key.replace(/\/\*$/, '')]: resolve(
                    value[0].replace(/^(.*)\/\*$/, 'src/$1'),
                ),
            }),
            {},
        ),
    }
    return config
}

const overrides = {
    addAlias,
}

// 跨域配置
const devServerConfig = () => config => {
    return {
        ...config,
        // 服务开启gzip
        compress: true,
        proxy: {
            '/h5': {
                target: backendUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/': '',
                },
            },
        },
    }
}

module.exports = {
    webpack: (config, env) => {
        // deal config func
        Object.values(overrides).forEach(override => {
            override(config, env)
        })
        return config
    },
    devServer: overrideDevServer(devServerConfig()),
}
