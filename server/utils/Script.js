import mongoose from 'mongoose'

import '../models/Script'

const Script = mongoose.model('Script');

export function listScripts() {
    return Script.find({});
}

export function createScript(data) {
    const script = new Script({
        name: data.name,
        charts: data.charts,
        maps: data.maps
    });
    return script.save();
}

export function deleteScript(id) {
    return Script.findById(id).remove();
}

export function updateScript(id, data) {
    return Script.findByIdAndUpdate(id, {
        $set: {
           name: data.name,
            charts: data.charts,
            maps: data.maps,
            datasets: data.datasets,
        }
    });
}
