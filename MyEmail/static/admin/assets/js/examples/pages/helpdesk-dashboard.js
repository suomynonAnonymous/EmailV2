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

    var chartColors = {
        borderColor: '#e8e8e8',
        fontColor: '#999'
    };

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#helpdesk-dashboard-daterangepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#helpdesk-dashboard-daterangepicker').daterangepicker({
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

    $('#circle-1').circleProgress({
        startAngle: 1.55,
        value: 0.65,
        size: 100,
        thickness: 10,
        emptyFill: $('body').hasClass('dark') ? '#383a3f' : '#e6e6e6',
        fill: {
            color: colors.secondary
        }
    });

    $('#circle-2').circleProgress({
        startAngle: 1.55,
        value: 0.35,
        size: 100,
        thickness: 10,
        emptyFill: $('body').hasClass('dark') ? '#383a3f' : '#e6e6e6',
        fill: {
            color: colors.success
        }
    });

    function bar_chart() {
        var options = {
            series: [{
                name: 'New Tickets',
                data: [44, 55, 41, 67, 22, 43, 24, 55, 10]
            }, {
                name: 'Solved Tickets',
                data: [13, 23, 20, 8, 13, 27, 42, 11, 33]
            }, {
                name: 'Pending Tickets',
                data: [11, 17, 15, 15, 21, 14, 52, 61, 22]
            }],
            chart: {
                type: 'bar',
                fontFamily: chartFontStyle,
                height: 300,
                offsetX: -20,
                width: '102%',
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                }
            },
            colors: [
                colors.secondary,
                colors.success,
                colors.warning,
                colors.info,
                colors.danger,
            ],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '04/01/2020 GMT',
                    '04/02/2020 GMT',
                    '04/03/2020 GMT',
                    '04/04/2020 GMT',
                    '04/05/2020 GMT',
                    '04/06/2020 GMT',
                    '04/07/2020 GMT',
                    '04/08/2020 GMT',
                    '04/09/2020 GMT',
                ],
            },
            legend: {
                position: 'top',
                offsetY: 0
            },
            fill: {
                opacity: 1
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart-ticket-status"), options);

        chart.render();
    }

    function monthlySales() {
        var options = {
            series: [550, 200, 100, 50, 100],
            chart: {
                type: 'donut',
                height: 320,
                fontFamily: chartFontStyle,
            },
            labels: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'],
            colors: [colors.primary, colors.success, colors.warning, colors.info, colors.danger],
            track: {
                background: "#cccccc"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                colors: [colors.primary, colors.success, colors.warning, colors.info, colors.danger],
            },
            plotOptions: {
                pie: {
                    expandOnClick: true,
                    donut: {
                        labels: {
                            show: true,
                            value: {
                                formatter: function (val) {
                                    return val;
                                }
                            }
                        }
                    }
                }
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return '$' + val;
                    }
                }
            },
            legend: {
                show: false
            }
        };

        var chart = new ApexCharts(document.querySelector("#customer-satisfaction"), options);

        chart.render();
    }

    monthlySales();

    bar_chart();

});
