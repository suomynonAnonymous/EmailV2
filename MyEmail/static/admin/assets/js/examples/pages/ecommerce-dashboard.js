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

    $('#recent-orders').DataTable({
        lengthMenu: [5, 10],
        "columnDefs": [{
            "targets": 5,
            "orderable": false
        }]
    });

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#ecommerce-dashboard-daterangepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#ecommerce-dashboard-daterangepicker').daterangepicker({
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

    function sales() {
        var options = {
            chart: {
                type: 'bar',
                fontFamily: chartFontStyle,
                offsetX: -18,
                height: 350,
                width: '103%',
                toolbar: {
                    show: false
                }
            },
            series: [{
                name: 'Total',
                data: [184, 255, 257, 156, 180, 158, 200]
            }],
            colors: [colors.primary, colors.info],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 8,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: "top",
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return '$' + val;
                    }
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#sales"), options);

        chart.render();
    }

    function monthlySales() {
        var options = {
            series: [244, 355],
            chart: {
                type: 'donut',
                height: 320,
                fontFamily: chartFontStyle,
            },
            labels: ['Credit Card', 'Bank Card'],
            colors: [colors.primary, colors.success],
            track: {
                background: "#cccccc"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                colors: [colors.primary, colors.success],
            },
            plotOptions: {
                pie: {
                    expandOnClick: true,
                    donut: {
                        labels: {
                            show: true,
                            value: {
                                formatter: function (val) {
                                    return '$' + val;
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

        var chart = new ApexCharts(document.querySelector("#monthly-sales"), options);

        chart.render();
    }

    sales();

    monthlySales();

});
