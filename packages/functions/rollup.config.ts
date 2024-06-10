import { PackageJson, buildDistPackageJson, buildSiblingAliases, getSiblingPackageJsonPaths, writePackageJson } from '@jucy/build-utils';
import alias, { ResolverObject } from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import path from 'path';
import command from 'rollup-plugin-command';
import pluginNodeExternals from 'rollup-plugin-node-externals';
import swc from 'rollup-plugin-swc3';
import { TsConfigJson } from 'type-fest';
import url from 'url';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = buildDistPackageJson(packageJsonPath);
const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json').toString()) as Required<TsConfigJson>;
const distDir = path.resolve(__dirname, process.env.ROLLUP_WATCH === 'true' ? './lib' : (tsConfig.compilerOptions.outDir as string));
// console.log(buildSiblingAliases(packageJsonPath));
// process.exit();
export default {
    input: 'src/index.ts',
    output: {
        dir: distDir,
        format: 'cjs',
        sourcemap: 'inline',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        compact: true,
        generatedCode: 'es2015',
        entryFileNames: '[name].js',
        interop: 'compat',
    },
    context: 'this',
    plugins: [
        alias({
            entries: buildSiblingAliases(packageJsonPath),
            customResolver: resolve({ extensions: ['.ts'], rootDir: `${__dirname}/../` }) as ResolverObject,
        }),
        json(),
        pluginNodeExternals({ packagePath: [packageJsonPath, ...getSiblingPackageJsonPaths(packageJsonPath)] }),
        resolve({ extensions: ['.ts'], preferBuiltins: true }),
        swc({
            sourceMaps: true,
            tsconfig: './tsconfig.build.json',

            jsc: {
                parser: {
                    syntax: 'typescript',
                    decorators: true,
                },
                target: 'es2021',
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                },
            },
        }),
        command(
            [
                async () => {
                    const { ...distPackageJson } = { ...packageJson, main: 'index.js' };
                    writePackageJson(`${distDir}/package.json`, distPackageJson as PackageJson);
                },
            ],
            { exitOnFail: true }
        ),
    ],
    external: [...Object.keys(packageJson.dependencies || {})],
};
