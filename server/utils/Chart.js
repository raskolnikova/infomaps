import mongoose from 'mongoose'

import '../models/Chart'

const Chart = mongoose.model('Chart');

export function listChart(){
  return Chart.find({});
}

export function createChart(data){
  const chart = new Chart({
    name: data.name,
    file:data.file,
    type:data.type,
    createdAt:data.createdAt,
    visibleColumns:data.visibleColumns
  });
  return chart.save();
}

export function deleteChart(id){
  return Chart.findById(id).remove();
}
