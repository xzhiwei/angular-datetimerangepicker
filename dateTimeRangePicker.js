angular.module('dateTimeRangePicker',[]);
angular.module('dateTimeRangePicker').directive('dateTimeRangePicker',function () {
        return {
            restrict:'E',
            replace:true,

            scope:{
                placeholder:'@',
                beginDate:'=',
                endDate:'=',
                configData:'&',
                dateChange:'='
            },
            template:"<button type=\"button\" class=\"btn btn-default  pull-right form-control\">\n" +
            "                                <span>{{placeholder}}</span>\n" +
            "                                <i class=\"fa fa-caret-down\"></i>\n" +
            "                            </button>",
            link:function (scope, element, attr,ctrls) {
                var defaultDateFormat = 'YYYY/MM/DD HH:mm';
                var defaults = {
                    startDate:scope.beginDate!= null?new Date(scope.beginDate):null,
                    endDate:scope.endDate!=null?new Date(scope.endDate):null,
                    format:defaultDateFormat,
                    timePicker: true,
                    timePicker24Hour:true,
                    timePickerIncrement: 5,
                    separator:' ~ ',
                    locale:{
                        applyLabel : '确定',
                        cancelLabel : '取消',
                        fromLabel : '起始时间',
                        toLabel : '结束时间',
                        customRangeLabel : '自定义',
                        daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                            '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                        firstDay : 0
                    },
                    drops:'down'
                };
                var datePickerConfig = angular.extend({}, defaults, scope.configData());
                if(scope.beginDate != null && scope.endDate !=null){
                    scope.placeholder = moment(scope.beginDate).format(defaultDateFormat) +
                        datePickerConfig['separator'] +
                        moment(scope.endDate).format(defaultDateFormat) ;
                }
                $(element).daterangepicker(
                    datePickerConfig,
                    function (start,end) {
                        scope.placeholder = moment(start).format(defaultDateFormat) +
                            datePickerConfig['separator']  +
                            moment(end).format(defaultDateFormat);
                        scope.dateChange(start,end);
                        scope.beginDate = start;
                        scope.endDate = end;
                        scope.$apply();
                    }
                );
            }
        }
});