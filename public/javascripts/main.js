// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main-canvas'));

function processPackageData(package)
{
    return {
        name: package.time,
        value: [
            package.time,
            Math.round(package.size / 1000),
            package
        ]
    }
}

function refreshCanvas(packages)
{
    var series = [];
    var option = {
        title: {
            text: 'App Report'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var param = params[0];
                var package = param.value[2];
                var t = new Date(Date.parse(package.time));
                var timestr = t.getFullYear() + '/' + (t.getMonth() + 1) + '/' + (t.getDate() + 1) + ' ' + t.getHours() + ':' + t.getMinutes();
                return package.project_code + ' ' + package.platform + ' ' + timestr + ' ' + Math.round(package.size / 1000) + 'KB ' + package.version;
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: true
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: true
            }
        },
        // dataZoom: [
        //     {   // 这个dataZoom组件，默认控制x轴。
        //         type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        //         start: 0,      // 左边在 10% 的位置。
        //         end: 100,         // 右边在 60% 的位置。
        //         xAxisIndex: 0,
        //     },
        //     {   // 这个dataZoom组件，也控制x轴。
        //         type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
        //         start: 0,      // 左边在 10% 的位置。
        //         end: 100,         // 右边在 60% 的位置。
        //         xAxisIndex: 0,
        //     },
        //     {   // 这个dataZoom组件，默认控制x轴。
        //         type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        //         start: 10,      // 左边在 10% 的位置。
        //         end: 80,         // 右边在 60% 的位置。
        //         yAxisIndex: 0,
        //     },
        //     {   // 这个dataZoom组件，也控制x轴。
        //         type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
        //         start: 10,      // 左边在 10% 的位置。
        //         end: 80,         // 右边在 60% 的位置。
        //         yAxisIndex: 0,
        //     }
        // ],
        series: series,
    };

    var dic = {}
    for(var i = 0; i < packages.length; i++)
    {
        var package = packages[i];
        var platform = package.platform;
        var projectCode = package.project_code;
        if(dic[projectCode] == null)
        {
            dic[projectCode] = {}
        }
        var pdic = dic[projectCode];
        if(pdic[platform] == null)
        {
            pdic[platform] = [];
        }
        pdic[platform].push(processPackageData(package));
    }

    for(var key in dic)
    {
        var pdic = dic[key];
        for(var pkey in pdic)
        {
            series.push({
                name: key + '-' + pkey,
                type: 'line',
                // showSymbol: false,
                // hoverAnimation: false,
                data: pdic[pkey],
            });
        }
    }

    myChart.setOption(option, true, false);
}

$(function() {

    $("#refresh-btn").click(function() {
        $.ajax({
            url : '/refresh',
            type : 'POST',
            dataType:'json',
            data: $("#query-form").serialize(),
            success : function(data)
            {
                // alert('result ' + data.result)
                refreshCanvas(data.packages);
            },
            error : function(req, errText)
            {
              alert(errText);
            }
        });
    });
});



