const { Etcd3 } = require("etcd3");

const CLUSTER_DEV = [
    'http://127.0.0.1:2381',
    'http://127.0.0.1:2382',
    'http://127.0.0.1:2383',
    'http://127.0.0.1:2384',
    'http://127.0.0.1:2385'
];

const db = new Etcd3({ hosts: CLUSTER_DEV });

async function getProfilePage(req, res) {
    try {
        const userID = req.query?.username;

        const user = await db.get(`user:${userID}`)?.json(); 
        if (!user) {
            req.flash('error', 'User not found');
            res.redirect('/home');
            return; // Encerrar a função se o usuário não for encontrado
        }

        const purchases = [];
        const user_purchases = await db.getAll().prefix(`purchase:${userID}:`).json();
        if (user_purchases) {
            for (const key in user_purchases) {
                const event_id = key.split(':')[2];
                const event_name = (await db.get(`event:${event_id}`).json()).name;
                purchases.push({
                    'event_name': event_name,
                    'event_id': event_id,
                    'info': user_purchases[key]
                });
            }
        }

        res.render('profile', { 
            user: user, 
            purchases: purchases,
            error_message: req.flash('error'), 
            success_message: req.flash('success'),
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error: lost DB connection');
        res.redirect('/');
    }
}

module.exports = {
    getProfilePage
};