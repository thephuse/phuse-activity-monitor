export default function sort(arr, value) {
  switch (value) {
    case 'FIRST_NAME_ASC':
      return arr.sort(function(a, b) {
        if(a.first_name < b.first_name) return -1;
        if(a.first_name > b.first_name) return 1;
        return 0;
      })
    case 'FIRST_NAME_DESC':
      return arr.sort(function(a, b) {
        if(a.first_name < b.first_name) return 1;
        if(a.first_name > b.first_name) return -1;
        return 0;
      })
    case 'LAST_NAME_ASC':
      return arr.sort(function(a, b) {
        if(a.last_name < b.last_name) return -1;
        if(a.last_name > b.last_name) return 1;
        return 0;
      })
    case 'LAST_NAME_DESC':
      return arr.sort(function(a, b) {
        if(a.last_name < b.last_name) return 1;
        if(a.last_name > b.last_name) return -1;
        return 0;
      })
    case 'TOTAL_HOURS_ASC':
      return arr.sort(function(a, b) {
        if(a.total < b.total) return -1;
        if(a.total > b.total) return 1;
        return 0;
      })
    case 'TOTAL_HOURS_DESC':
      return arr.sort(function(a, b) {
        if(a.total < b.total) return 1;
        if(a.total > b.total) return -1;
        return 0;
      })
    case 'BILLABLE_HOURS_ASC':
      return arr.sort(function(a, b) {
        if(a.billable_total < b.billable_total) return -1;
        if(a.billable_total > b.billable_total) return 1;
        return 0;
      })
    case 'BILLABLE_HOURS_DESC':
      return arr.sort(function(a, b) {
        if(a.billable_total < b.billable_total) return 1;
        if(a.billable_total > b.billable_total) return -1;
        return 0;
      })
    case 'BILLABLE_RATIO_ASC':
      return arr.sort(function(a, b) {
        if(a.billable_total/a.total < b.billable_total/b.total) return -1;
        if(a.billable_total/a.total > b.billable_total/b.total) return 1;
        return 0;
      })
    case 'BILLABLE_RATIO_DESC':
      return arr.sort(function(a, b) {
        if(a.billable_total/a.total < b.billable_total/b.total) return 1;
        if(a.billable_total/a.total > b.billable_total/b.total) return -1;
        return 0;
      })
    default:
      return arr
  }
}
