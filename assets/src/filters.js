import dateUtils from './dateUtils'
import Vue from 'vue'

Vue.filter('localDateTime', {
    read: (value) => dateUtils.formatDate(value),
    write: (value, oldValue) => new Date(value)
});
