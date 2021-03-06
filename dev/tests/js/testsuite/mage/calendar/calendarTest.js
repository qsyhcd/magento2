/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    mage.calendar
 * @package     test
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
CalendarTest = TestCase('CalendarTest');
CalendarTest.prototype.testInit = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = jQuery('#calendar').calendar();
    assertEquals(true, calendar.is(':mage-calendar'));
    calendar.calendar('destroy');
};
CalendarTest.prototype.testGlobalConfigurationMerge = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    $.extend(true, $, {
        calendarConfig: {
            showOn: 'button',
            showAnim: '',
            buttonImageOnly: true,
            showButtonPanel: true,
            showWeek: true,
            timeFormat: '',
            showTime: false,
            showHour: false,
            showMinute: false
        }
    });
    var calendar = $('#calendar').calendar();
    assertEquals('button', calendar.calendar('option', 'showOn'));
    assertEquals('', calendar.calendar('option', 'showAnim'));
    assertEquals(true, calendar.calendar('option', 'buttonImageOnly'));
    assertEquals(true, calendar.calendar('option', 'showButtonPanel'));
    assertEquals(true, calendar.calendar('option', 'showWeek'));
    assertEquals('', calendar.calendar('option', 'timeFormat'));
    assertEquals(false, calendar.calendar('option', 'showTime'));
    assertEquals(false, calendar.calendar('option', 'showHour'));
    assertEquals(false, calendar.calendar('option', 'showMinute'));
    calendar.calendar('destroy');
    delete $.calendarConfig;
};
CalendarTest.prototype.testEnableAMPM = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = $('#calendar').calendar({timeFormat: 'hh:mm tt', ampm: false});
    assertEquals(true, calendar.calendar('option', 'ampm'));
    calendar.calendar('destroy');
};
CalendarTest.prototype.testDisableAMPM = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = $('#calendar').calendar({timeFormat: 'hh:mm'});
    assertEquals(true, calendar.calendar('option', 'ampm') != true);
    calendar.calendar('destroy');
};
CalendarTest.prototype.testWithServerTimezoneOffset = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var serverTimezoneSeconds = 1346122095,
        calendar = $('#calendar').calendar({serverTimezoneSeconds: serverTimezoneSeconds}),
        currentDate = new Date();
    currentDate.setTime((serverTimezoneSeconds + currentDate.getTimezoneOffset() * 60) * 1000);
    assertEquals(true, currentDate.toString() === calendar.calendar('getTimezoneDate').toString());
    calendar.calendar('destroy');
}
CalendarTest.prototype.testWithoutServerTimezoneOffset = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = $('#calendar').calendar(),
        currentDate = new Date();
    assertEquals(true, currentDate.toString() === calendar.calendar('getTimezoneDate').toString());
    calendar.calendar('destroy');
}
CalendarTest.prototype.testInitDateTimePicker = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = $('#calendar').calendar();
    assertEquals(true, calendar.hasClass('hasDatepicker'));
    calendar.calendar('destroy');
}
CalendarTest.prototype.testDateTimeMapping = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = $('#calendar').calendar({dateFormat: 'M/d/yy', timeFormat: 'h:mm a'});
    assertEquals('mm/d/yy', calendar.calendar('option', 'dateFormat'));
    assertEquals('h:mm tt', calendar.calendar('option', 'timeFormat'));
    calendar.calendar('destroy');
    calendar.calendar({dateFormat: 'MMMM/EEEE/yyyy', timeFormat: 'HH:mm'});
    assertEquals('MM/DD/yy', calendar.calendar('option', 'dateFormat'));
    assertEquals('hh:mm', calendar.calendar('option', 'timeFormat'));
    calendar.calendar('destroy');
}
CalendarTest.prototype.testDestroy = function() {
    /*:DOC += <input type="text" id="calendar" /> */
    var calendar = $('#calendar').calendar(),
        calendarExist = calendar.is(':mage-calendar');
    calendar.calendar('destroy');
    assertEquals(true, calendarExist != calendar.is(':mage-calendar'));
}
