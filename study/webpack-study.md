## 学习webpack

### npm run build => build.js

- build.js 第一行引入自己封装check-versions
## check-version
### versionRequirements,代表需要的版本，并且进行判断
> 对应package json中的
```
"engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
```
- process.version 代表node的版本，[详细的process的用法](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_version)
- versionRequirements对运行时的版本运用了semver.clean(process.version) 好，接下来我们去看看semver这个库是干嘛用的,semver是一个语义话版本的实现，提供非常便利的函数来作版本的比较
- 获取npm version的时候，通过node child_process 来执行shell 命令，并获取返回值
- 遍历versionRequirements，通过semver.satisfies比对版本，如果版本不服合，则warning
- 打warning的时候调用了chalk库，chalk是在命令行对[文本样式，颜色的处理的库](https://github.com/chalk/chalk),
- 如果比对发现，当前版本不符合需要的版本，则 process.exit(1)推出程序，编译结束


### 继续build.js
```
const spinner = ora('building for production...')
spinner.start()

```
这里面用到了ora，ora 是个啥，简单说ora相当于loading库 ,[ora](https://github.com/sindresorhus/ora)

## 删除之前的build 的dist文
rm(path.join(config.build.assetsRoot, config.build.assesSubDirectory)然后callback中回去webapck的prodConfig,交给webpack 启动编译，编译成功之后打印编译相关的信息
```
 process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
```
