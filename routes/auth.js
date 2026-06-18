const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

router.post('/register', async (req, res) => {
  try {

    const { nome, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json(error);
    }

    await supabase
      .from('usuarios')
      .insert([
        {
          id: data.user.id,
          nome,
          email
        }
      ]);

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso'
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      return res.status(401).json(error);
    }

    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('nome')
      .eq('id', data.user.id)
      .single();

    res.json({
      ...data,
      nome: userData ? userData.nome : 'Torcedor'
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;