import mongoose from 'mongoose'

import '../models/Map'

const Map = mongoose.model('Map');

export function listMap() {
    return Map.find({});
}

export function createMap(data) {
    const map = new Map({
        name: data.name,
        data: data.data,
        type: data.type,
        colorSchema: data.colorSchema,
        createdAt: data.createdAt,
        visibleColumns: data.visibleColumns,
        domen:data.domen,
        ISO3Column:data.ISO3Column
    });
    return map.save();
}

export function deleteMap(id) {
    return Map.findById(id).remove();
}

export function updateMap(id, data) {
    return Map.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
        data: data.data,
        type: data.type,
        colorSchema: data.colorSchema,
        createdAt: data.createdAt,
        visibleColumns: data.visibleColumns,
        domen:data.domen,
        ISO3Column:data.ISO3Column
        }
    });
}
