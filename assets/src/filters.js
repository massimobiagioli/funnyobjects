import dateUtils from './dateUtils'
import Vue from 'vue'

Vue.filter('localDateTime', {
    read: (value) => dateUtils.formatDate(value),
    write: (value, oldValue) => new Date(value)
});

Vue.filter('checkbox', {
    read: (value) => value == 1,
    write: (value, oldValue) => value ? 1 : 0
});
