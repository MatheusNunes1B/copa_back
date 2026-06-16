const express = require('express');
const router = express.Router();

const supabase = require('../data/supabase');

// Buscar feed
router.get('/', async (req, res) => {

    try {

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', {
                ascending: false
            });

        if (error) throw error;

        res.json(data);

    } catch (err) {
        res.status(500).json(err);
    }

});

// Criar post
router.post('/', async (req, res) => {

    try {

        const {
            usuario_id,
            texto,
            imagem
        } = req.body;

        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    usuario_id,
                    texto,
                    imagem
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;