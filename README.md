# AppReport

图表化的方式统计App安装包的包体大小变化情况。

## Usage

通过api上传参数：`appreport_ip`:`appreport_port`/api/upload

参数：

*	project_code: 项目代号
*	platform: 平台，ios 或者 android
*	version: 版本号
*	size: 包体大小(字节)
*	commit_version: svn提交号 或者 git SHA-1

## Test

curl -d "commit_version=1&platform=android&size=100&version=0.0.1" `appreport_ip`:`appreport_port`/api/upload


## Example

