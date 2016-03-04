'use strict';

const async = require('async');
const harvest = require('./harvest');

const getActivePeople = function(iter) {
  return iter.user.is_active === true;
};

const getHours = function(timesheet) {
  return (timesheet.day_entry.hours) ? parseFloat(timesheet.day_entry.hours) : 0;
}

const totalHours = function(previous, current) {
  return previous + current;
};

const getBillableTasks = function(task) {
  return task.task.billable_by_default === true;
}

const getBillableHours = function(timesheets, tasks) {
  let billableTasks = tasks.filter(function(task) {
    return task
  })
}

const processTimesheets = function(billableFlag) {
  let billable = (billableFlag === true) ? 'billable_' : '';
  return function(from, to, iter, done) {
    return function(timesheets) {
      iter.user[`${billable}total`] = (timesheets.length) ? timesheets.map(getHours).reduce(totalHours) : 0;
      done();
    }
  }
};

const getTimesheets = function(billableFlag) {
  let billable = (billableFlag === true) ? '&billable=yes' : '';
  let callback = (billableFlag === true) ? processBillableTimesheets : processAllTimesheets;
  return function(from, to) {
    return function(iter, done) {
      harvest.get(`people/${iter.user.id}/entries?from=${from}&to=${to}${billable}`)(callback(from, to, iter, done));
    }
  }
};

const requestAllTimesheets = function(params, people) {
  return function(done) {
    async.each(people, getAllTimesheets(params.from, params.to), function(data) {
      done(null);
    });
  }
};

const requestBillableTimesheets = function(params, people) {
  return function(done) {
    async.each(people, getBillableTimesheets(params.from, params.to), function(data) {
      done(null);
    });
  }
};

const processAllTimesheets = processTimesheets(false);
const processBillableTimesheets = processTimesheets(true);
const getAllTimesheets = getTimesheets(false);
const getBillableTimesheets = getTimesheets(true);

const people = function(req, res) {
  res.type('application/json');
  harvest.get(`people`)(function(output) {
    res.send(output)
  });
};

const tasks = function(req, res) {
  res.type('application/json');
  harvest.get(`tasks`)(function(output) {
    res.send(output);
  });
};

const times = function(req, res) {
  res.type('application/json');
  harvest.get(`people`)(function(people) {
    let activePeople = people.filter(getActivePeople);
    async.waterfall([
      requestAllTimesheets(req.params, activePeople),
      requestBillableTimesheets(req.params, activePeople)
    ], function(error) {
      if (error) {
        console.error(error);
      } else {
        res.send(activePeople);
      }
    });
  });
};

module.exports = {
  people : people,
  times : times
};
