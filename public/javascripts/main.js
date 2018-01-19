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
                return package.time + ' : ' + Math.round(package.size / 1000) + 'KB \n' + package.version;
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
        series: series,
    };

    var iosData = []
    var androidData = []
    for(var i = 0; i < packages.length; i++)
    {
        var package = packages[i];
        if(package.platform == 'ios')
        {
            iosData.push(processPackageData(package));
        }
        else
        {
            androidData.push(processPackageData(package));
        }
    }
    series.push({
        name: 'iOS',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: iosData,
    });

    series.push({
        name: 'Android',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: androidData
    });

    myChart.setOption(option);
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



