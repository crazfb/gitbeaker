import replace from '@rollup/plugin-replace';
import pkg from './package.json';
import { commonConfig, commonPlugins } from '../../rollup.config';

export default {
  ...commonConfig,
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: pkg.main, // CommonJS (for Node) (for bundlers) build.
      format: 'cjs',
    },
    {
      file: pkg.module, // ES module (for bundlers) build.
      format: 'es',
    },
  ],
  plugins: [
    replace({
      __apiMap__: JSON.stringify(require('./dist/map.json'))
    }),
    ...commonPlugins,
  ]
};
