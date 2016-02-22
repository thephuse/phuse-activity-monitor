import test from 'tape'

//import React from 'react/addons'
//import shallowHelpers from 'react-shallow-renderer-helpers'

import {
  requestTimes,
  receiveTimes,
  generateDates,
  sortBy,
  setPeriod,
  setDates
} from '../../../client/actions'

test('action requestTimes', t => {
  t.deepEqual({ type : 'REQUEST_TIMES', startDate : 0, endDate : 1 }, requestTimes({ startDate : 0, 'endDate' : 1 }),
    'requestTimes should have REQUEST_TIMES as type, a start date and an end date'
  )
  t.end()
})

test('action receiveTimes', t => {
  t.deepEqual({ type : 'RECEIVE_TIMES', times : [], receivedAt : Date.now() }, receiveTimes([]),
    'requestTimes should have RECEIVE_TIMES as type, receive a payload and stamp it with the current time'
  )
  t.end()
})

test('action generateDates', t => {
  t.deepEqual({ startDate : 0, endDate : 1 }, generateDates({ timesheets : { startDate : 0, endDate : 1 } }),
    'generateDates should return a startDate and endDate value from the current state'
  )
  t.end()
})

test('action sortBy', t => {
  t.deepEqual({ type : 'SORT_BY', value : 'alpha' }, sortBy('alpha'),
    'sortBy should have SORT_BY as type, and a sort value'
  )
  t.end()
})

test('action setPeriod', t => {
  t.deepEqual({ type : 'SET_PERIOD', period : [] }, setPeriod([]),
    'setPeriod should have SET_PERIOD as type, and set a period value'
  )
  t.end()
})

