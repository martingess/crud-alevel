import Table from './table.js';
import Data from './data.js';
import {
  Control
} from './control.js'
export let table;
(async () => {
  let usersData = await Data.getUsersData();
  table = new Table(Object.values(usersData[0]).length, Object.keys(usersData[0]))
  table.createTable()
})()