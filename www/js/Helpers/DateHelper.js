angular.module('appcki.helper')
    .factory('DateHelper', [  function( ){
        'use strict';

        var DateHelper = {};

        var days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
        var dayShort = ["zo", "ma", "di", "wo", "do", "vr", "za"];

        var month = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
        var m = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sept", "okt", "nov", "dec"];

        /**
         * Formats a digit with a leading digit if necessary to make it return 
         * a String of length 2
         * @param   digit that needs formatting
         * return   String of at least length 2
         */
        var twoDigit = function(digit)
        {
            var str = (digit < 10) ? "0%d" : "%d";
            return str.sprintf(digit);
        };

        /** 
         * Splits any of the more common date strings into an object array
         * giving the year, month, day, day of the week, hour, minute and
         * second in the timestamp
         * @arg date        Timestamp
         * @return          Object
         */
        var splitDate = function(d)
        {
            var stamp = new Date(d);
            var date = {};
            
            date.year           = stamp.getFullYear();
            date.month          = stamp.getMonth();
            date.dayOfWeek      = stamp.getDay();
            date.day            = stamp.getDate();
            date.hour           = stamp.getHours();
            date.minute         = stamp.getMinutes();
            date.second         = stamp.getSeconds();

            return date;
        };

        /**
         * Return the number of milliseconds between a specified date and midnight January 1 1970
         * @arg     Anything that can be parsed as a date
         * @return  the number of milliseconds between a specified date and midnight January 1 1970
         */
        var UTC = function(date)
        {
            var stamp = splitDate(date);
            return Date.UTC(stamp.year, stamp.month, stamp.day, stamp.hour,stamp.minute,stamp.second);
        };

        /**
         * Formats date and time fully in Dutch, including the names of the weekday and month
         * @arg d   Timestamp
         * @return  String of format "day dd month YYYY hh:ii uur"
         */
        DateHelper.full = function(d)
        {
           return "%s %s uur".sprintf(DateHelper.dateFull(d), DateHelper.time(d));
        };

        /**
         * Formats date fully in Dutch, including the names of the weekday and month
         * @arg d   Timestamp
         * @return  String of format "day dd month YYYY"
         */
        DateHelper.dateFull = function(d)
        {
            var date = splitDate(d);           
            return "%s %s %s %d"
            .sprintf(
                    days[date.dayOfWeek], 
                    date.day,
                    month[date.month],
                    date.year
                );
        };

        /**
         * Formats date in Dutch, including the names of the weekday and month as
         * their shorthand notation
         * @arg d   Timestamp
         * @return  String of format "da 00 mo YYYY"
         */
        DateHelper.dateShort = function(d)
        {
            var date = splitDate(d);
             return "%s %s %s %d"
            .sprintf(
                    dayShort[date.dayOfWeek], 
                    date.day,
                    m[date.month],
                    date.year
                );
        };

        /**
         * Formats a date in number according to Dutch standards
         * @arg     Timestamp
         * @return  String of format "dd-MM-YYYY"
         */
        DateHelper.dateNumbers = function(d)
        {
            var date = splitDate(d);
            return "%s-%s-%s"
            .sprintf(
                    twoDigit(date.day),
                    twoDigit(date.month),
                    date.year
                );
        };

        /**
         * Formats a timestamp to a time
         * @param       Timestamp
         * @return      String of format "HH:ïi"
         */
        DateHelper.time = function(d)
        {
            var date = splitDate(d);
            return "%s:%s".sprintf(
                    twoDigit(date.hour),
                    twoDigit(date.minute)
                );
        };

        DateHelper.difference = function(d)
        {
            var diff = UTC(new Date()) - UTC(d);
            var dir, result, q, plural;
            
            if (diff === 0) {
                result = "nu";
                return result;
            } else if (diff < 0) {
                dir = "Over %s";
                diff *= -1;
            } else {
                dir = "%s geleden";
            }

            var sec         = 1000;
            var halfmin     = 30000;
            var m           = 60000;
            var h           = 3600000;
            var day         = 84000000;
            var w           = 604800000;
            var month       = 2628000000;
            var year        = 31540000000;

            if(diff < sec)
            {
                result = dir.sprintf("Minder dan een seconde");
            } else if (halfmin < 30000) {
                result = dir.sprintf("Minder dan een halve minuut");
            } else if (diff < h) {
                q = Math.floor(diff / m);
                plural = (q == 1) ? "" : "en";
                result = dir.sprintf("%d minut%s".sprintf(q, plural));
            } else if (diff < day) {
                q = Math.round(diff / h);
                result = dir.sprintf("%d uur".sprintf(q));
            } else if (diff < w) {
                q = Math.round(diff / day);
                plural = (q == 1) ? "" : "en";
                result = dir.sprintf("%d dag%s".sprintf(q, plural));
            } else if (diff < month) {
                q = Math.round(diff / w);
                plural = (q == 1) ? "week" : "weken";
                result = dir.sprintf("%d %s".sprintf(q, plural));
            } else if (diff < year) {
                q = Math.round(diff / month);
                plural = (q == 1) ? "" : "en";
                result = dir.sprintf("%d maand%s".sprintf(q, plural));
            } else {
                q = Math.round(diff / year);
                result = dir.sprintf("%d jaar".sprintf(q));
            }

            return result;

        };

        
        return DateHelper;

    }
]);