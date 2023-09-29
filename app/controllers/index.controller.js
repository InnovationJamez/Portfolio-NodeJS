const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../json/info.json');

const loadJSON = async () => {
    try {
        const data = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(data);
    }
    catch(err) {
        console.error(err);
    }
}

// home controller
exports.home = (req, res) => {
    res.render('index', {
        user: req.user
    });
}

// experience page
exports.exp = async (req, res) => {
    let data = await loadJSON();
    res.render('exp', {
        data: data,
        user: req.user
    });
}

// projects page
exports.project = async (req, res) => {
    let data = await loadJSON();
    res.render('project', {
        projects: data.projects,
        user: req.user
    });
}

// freelance page
exports.freelance = async (req, res) => {
    res.render('freelance', {
        user: req.user
    });
}