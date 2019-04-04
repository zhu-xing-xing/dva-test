export default {
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "extraBabelPlugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }]
  ],
  "theme": "./src/theme.js",
  "disableCSSModules": true,
}
