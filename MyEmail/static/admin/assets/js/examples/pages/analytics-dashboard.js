$(function () {

    var colors = {
            primary: $('.colors .bg-primary').css('background-color').replace('rgb', '').replace(')', '').replace('(', '').split(','),
            secondary: $('.colors .bg-secondary').css('background-color').replace('rgb', '').replace(')', '').replace('(', '').split(','),
            info: $('.colors .bg-info').css('background-color').replace('rgb', '').replace(')', '').replace('(', '').split(','),
            success: $('.colors .bg-success').css('background-color').replace('rgb', '').replace(')', '').replace('(', '').split(','),
            danger: $('.colors .bg-danger').css('background-color').replace('rgb', '').replace(')', '').replace('(', '').split(','),
            warning: $('.colors .bg-warning').css('background-color').replace('rgb', '').replace(')', '').replace('(', '').split(','),
        },
        chartFontStyle = 'Fira Sans';

    var rgbToHex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    var fullColorHex = function (r, g, b) {
        var red = rgbToHex(r);
        var green = rgbToHex(g);
        var blue = rgbToHex(b);
        return red + green + blue;
    };

    colors.primary = '#' + fullColorHex(colors.primary[0], colors.primary[1], colors.primary[2]);
    colors.secondary = '#' + fullColorHex(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    colors.info = '#' + fullColorHex(colors.info[0], colors.info[1], colors.info[2]);
    colors.success = '#' + fullColorHex(colors.success[0], colors.success[1], colors.success[2]);
    colors.danger = '#' + fullColorHex(colors.danger[0], colors.danger[1], colors.danger[2]);
    colors.warning = '#' + fullColorHex(colors.warning[0], colors.warning[1], colors.warning[2]);

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#analytics-dashboard-daterangepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#analytics-dashboard-daterangepicker').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

    function online_users() {
        if ($('#online-users').length > 0) {
            var lastDate = 0;
            var data = [];
            var TICKINTERVAL = 86400000;
            let XAXISRANGE = 777600000;

            function getDayWiseTimeSeries(baseval, count, yrange) {
                var i = 0;
                while (i < count) {
                    var x = baseval;
                    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

                    data.push({
                        x, y
                    });
                    lastDate = baseval;
                    baseval += TICKINTERVAL;
                    i++;
                }
            }

            getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
                min: 10,
                max: 90
            });

            function getNewSeries(baseval, yrange) {
                var newDate = baseval + TICKINTERVAL;
                lastDate = newDate;

                for (var i = 0; i < data.length - 10; i++) {
                    // IMPORTANT
                    // we reset the x and y of the data which is out of drawing area
                    // to prevent memory leaks
                    data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
                    data[i].y = 0
                }

                data.push({
                    x: newDate,
                    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
                })
            }

            function resetData() {
                // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
                data = data.slice(data.length - 10, data.length);
            }

            var options = {
                series: [{
                    data: data.slice()
                }],
                chart: {
                    id: 'realtime',
                    height: 150,
                    type: 'line',
                    fontFamily: chartFontStyle,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                    colors: ['#ffffff'],
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    type: 'datetime',
                    range: XAXISRANGE,
                    axisBorder: {
                        show: false,
                    }
                },
                yaxis: {
                    show: false,
                    max: 100
                },
                grid: {
                    show: false,
                }
            };

            var chart = new ApexCharts(document.querySelector("#online-users"), options);
            chart.render();

            window.setInterval(function () {
                getNewSeries(lastDate, {
                    min: 10,
                    max: 90
                });

                chart.updateSeries([{
                    data: data
                }])
            }, 1000)
        }
    }

    function device_session_chart() {
        if ($('#device_session_chart').length) {

            var data = [
                {
                    name: "Mobile",
                    data: [90, 152, 138, 145, 120, 123, 140]
                },
                {
                    name: "Tablet",
                    data: [125, 90, 128, 135, 150, 123, 180]
                },
                {
                    name: "Desktop",
                    data: [50, 200, 138, 135, 100, 123, 90]
                }
            ];

            var options = {
                chart: {
                    type: 'area',
                    fontFamily: chartFontStyle,
                    height: 300,
                    offsetX: -18,
                    width: '103%',
                    stacked: true,
                    events: {
                        selection: function (chart, e) {
                            // console.log(new Date(e.xaxis.min))
                        }
                    },
                    toolbar: {
                        show: false,
                    }

                },
                colors: [colors.primary, colors.secondary, colors.success],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 1
                },
                series: data,
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: .6,
                        opacityTo: 0,
                    }
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        "01 Jan",
                        "02 Jan",
                        "03 Jan",
                        "04 Jan",
                        "05 Jan",
                        "06 Jan",
                        "07 Jan"
                    ]
                }
            };

            var chart = new ApexCharts(
                document.querySelector("#device_session_chart"),
                options
            );

            chart.render();
        }
    }

    function analytics_tab1() {
        if ($('#analytics-tab-1').length) {
            var options = {
                series: [{
                    name: 'Users',
                    data: [20, 25, 15, 12, 25, 20, 22]
                }],
                chart: {
                    height: 280,
                    type: 'area',
                    offsetX: -20,
                    offsetY: 20,
                    width: '102%',
                    fontFamily: chartFontStyle,
                    toolbar: {
                        show: false,
                    }
                },
                stroke: {
                    width: 1,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        "01 Jan",
                        "02 Jan",
                        "03 Jan",
                        "04 Jan",
                        "05 Jan",
                        "06 Jan",
                        "07 Jan"
                    ]
                },
                colors: [colors.secondary],
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: .6,
                        opacityTo: 0,
                    }
                },
            };

            var chart = new ApexCharts(document.querySelector("#analytics-tab-1"), options);

            chart.render();
        }
    }

    function analytics_tab2() {
        if ($('#analytics-tab-2').length) {
            var options = {
                series: [{
                    name: 'Conversations',
                    data: [10, 35, 10, 22, 25, 10, 30]
                }],
                chart: {
                    height: 280,
                    type: 'area',
                    offsetX: -20,
                    width: '102%',
                    fontFamily: chartFontStyle,
                    toolbar: {
                        show: false,
                    }
                },
                stroke: {
                    width: 1,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        "01 Jan",
                        "02 Jan",
                        "03 Jan",
                        "04 Jan",
                        "05 Jan",
                        "06 Jan",
                        "07 Jan"
                    ]
                },
                colors: [colors.success],
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: .6,
                        opacityTo: 0,
                    }
                },
            };

            var chart = new ApexCharts(document.querySelector("#analytics-tab-2"), options);

            chart.render();
        }
    }

    function analytics_tab3() {
        if ($('#analytics-tab-3').length) {
            var options = {
                series: [{
                    name: 'Bounce Rate',
                    data: [20.5, 30.6, 25.6, 22.6, 25.1, 15.5, 18.0]
                }],
                chart: {
                    height: 280,
                    type: 'area',
                    offsetX: -20,
                    offsetY: 20,
                    width: '102%',
                    fontFamily: chartFontStyle,
                    toolbar: {
                        show: false,
                    }
                },
                stroke: {
                    width: 1,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        "01 Jan",
                        "02 Jan",
                        "03 Jan",
                        "04 Jan",
                        "05 Jan",
                        "06 Jan",
                        "07 Jan"
                    ]
                },
                colors: [colors.info],
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: .6,
                        opacityTo: 0,
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "%" + val
                        }
                    }
                }
            };

            var chart = new ApexCharts(document.querySelector("#analytics-tab-3"), options);

            chart.render();
        }
    }

    function analytics_tab4() {
        if ($('#analytics-tab-4').length) {
            var options = {
                series: [{
                    name: 'Session Duration',
                    data: [25, 30, 25, 32, 25, 30, 18]
                }],
                chart: {
                    height: 280,
                    type: 'area',
                    offsetX: -20,
                    offsetY: 20,
                    width: '102%',
                    fontFamily: chartFontStyle,
                    toolbar: {
                        show: false,
                    }
                },
                stroke: {
                    width: 1,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        "01 Jan 2020 18:50",
                        "02 Jan 2020 18:50",
                        "03 Jan 2020 18:50",
                        "04 Jan 2020 18:50",
                        "05 Jan 2020 18:50",
                        "06 Jan 2020 18:50",
                        "07 Jan 2020 18:50"
                    ]
                },
                colors: [colors.warning],
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: .6,
                        opacityTo: 0,
                    }
                },
            };

            var chart = new ApexCharts(document.querySelector("#analytics-tab-4"), options);

            chart.render();
        }
    }

    function session_by_channel() {
        var options = {
            series: [742, 1742, 442, 1242],
            chart: {
                width: "100%",
                type: 'pie',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                colors: ['transparent']
            },
            colors: [colors.info, colors.success, colors.warning, colors.danger],
            labels: ['Email', 'Social Media', 'Referral', 'Organic Search'],
            legend: {
                show: false
            }
        };

        var chart = new ApexCharts(document.querySelector("#session_by_channel"), options);
        chart.render();
    }

    online_users();

    analytics_tab1();

    analytics_tab2();

    analytics_tab3();

    analytics_tab4();

    device_session_chart();

    session_by_channel();
});
