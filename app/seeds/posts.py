from app.models import db, Post, User
import random


def seed_posts():

    users = len(User.query.all())
    captionList = [
        'My team winning the LCS',
        'Looking Sexy Boy',
        'Foxxy as ever',
        'Dont waste the anger, channel it',
        'Cant milk those',
        'im sad',
        'on my wings',
        'tibbers',
        'bite my arrow',
        'naturally',
        'spawn',
        'dingaling',
        'ha ha ha ha .. ',
        'inferno',
        'Braum is here',
        'right!',
        'what a waste, how rude',
        'just a taste',
        'the daylight it BURNS',
        'speed of heat',
        'Noxus will rise',
        'chosen of the moon',
        'mundo will go where he pleases',
        'the league of draven',
        'fool me once and ill just rewind',
        'every web a masterpiece',
        'sealed with the kiss',
        'ya ya ya i got it i got it',
        'the end is near',
        'precision and grace',
        'swimingly, one jump ahead of you',
        'im a big man with big needs',
        'deadman tell my tail',
        'DEMACIIAAAA',
        'DA DA',
        'if your buying im in',
        'end of the line',
        'behold the might of the shadow isles',
        'hmmm verrrrrrrrryyyyyyy interesting',
        'my name is illaoi',
        'and now i dance alone',
        'knowledge is power',
        'the tempest is at your command',
        'by my willllll',
        'imagine if i had a real weapon',
        'to the skies',
        'hrrrp where there drama in that',
        'jinxed stands for jinxed',
        'fly or fight',
        'the wounds of betrayal never heal',
        'we must make all our choices',
        'for the unliving',
        'your magic is powerless against me',
        'violence solves everything',
        'eye for an eye',
        'its hard to beat a person who never gives up',
        'the eyes never lie',
        'channnggee is gooood',
    ]
    capt = len(captionList)

    urlList = [
        'https://static.invenglobal.com/upload/image/2017/02/22/i1487753623863997.jpeg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_7.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_15.jpg',
        'https://img.rankedboost.com/wp-content/plugins/league-of-legends-wild-rift/assets/skins/Moo%20Cow%20Alistar.jpg',
        'https://img.rankedboost.com/wp-content/plugins/league-of-legends-wild-rift/assets/skins/Infernal%20Amumu.jpg',
        'https://c4.wallpaperflare.com/wallpaper/295/161/138/league-of-legends-anivia-wallpaper-preview.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Annie_8.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_11.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_11.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Bard_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Brand_4.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_0.jpg',
        'https://www.pcgamesn.com/wp-content/uploads/2021/03/league-of-legends-battle-academia-caitlyn.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Camille_2.jpg',
        'https://www.mobafire.com/images/champion/skins/landscape/cassiopeia-spirit-blossom.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_7.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Corki_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_15.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Diana_2.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/DrMundo_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_2.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_19.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Elise_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_6.jpg',
        'https://cdn1.dotesports.com/wp-content/uploads/2020/08/26093146/Ezreal.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiddlesticks_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_22.jpg',
        'https://i.pinimg.com/originals/ae/16/0c/ae160cc092f339d1d91062ca6f8c0bf9.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_0.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_8.jpg',
        'https://pbs.twimg.com/profile_images/723255461613604865/F8CLdnlI.jpg',
        'https://i.ytimg.com/vi/KCHiM5jkHb0/maxresdefault.jpg',
        'https://64.media.tumblr.com/tumblr_m66w6wgr2t1r75hcfo1_1280.jpg',
        'https://i.imgur.com/LeZF17r.jpg',
        'https://static2.lolwallpapers.net/2015/01/Reaper-Hecarim.jpg',
        'https://i.pinimg.com/originals/e1/9f/ea/e19feafed3561da6234e2dbba79cc042.jpg',
        'https://i.pinimg.com/236x/5e/1f/b3/5e1fb329e7cb351a9aa5f213de0591db--legends-video-games.jpg',
        'https://m.media-amazon.com/images/I/61NJ63A90VL._AC_SX679_.jpg',
        'https://i.redd.it/g7hd51gdpfv31.jpg',
        'https://esportsedition.com/wp-content/uploads/2016/03/Janna.jpg',
        'https://pbs.twimg.com/media/EausR70UwAApcMg.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_1.jpg',
        'https://assets-esports.thescore.com/uploads/image/file/13852/cropped_Jayce_2.jpg?ts=1486655335',
        'https://i.redd.it/at6ebbz7ous41.png',
        'https://i.pinimg.com/originals/eb/2c/14/eb2c14c4effe7277d069c41dd482ab10.jpg',
        'https://lolskinshop.com/wp-content/uploads/2019/10/kaisa-invictus-gaming.jpg',
        'https://www.mobafire.com/images/champion/skins/landscape/kalista-marauder.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karma_19.jpg',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karthus_1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kLx4LgiNxFTf93A7ktF-un93Blfzvq2HVw&usqp=CAU',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16ba7581-d40f-45a6-ad94-b1e783d22fb6/de0lpnj-0c5cfa07-ff66-4790-9e9b-8c580740b972.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMTZiYTc1ODEtZDQwZi00NWE2LWFkOTQtYjFlNzgzZDIyZmI2XC9kZTBscG5qLTBjNWNmYTA3LWZmNjYtNDc5MC05ZTliLThjNTgwNzQwYjk3Mi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.jRcEeQMxGjRbhpWEzJR0UI_eFYQmhUoYpZBm3wBoNMA',
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_3.jpg',
        'https://static.wikia.nocookie.net/leagueoflegends/images/7/7d/Kayn_OriginalCentered.jpg/revision/latest/scale-to-width-down/1280?cb=20180414184150',
        'https://i.pinimg.com/originals/f8/56/ca/f856ca90f2077ff12a90bd39b0492942.jpg',
        'https://media.comicbook.com/2017/11/league-of-legends-kha-zix-1050705-1280x0.jpg'
    ]

    images = len(urlList)

    count = 0
    while count < 49:
        new_post = Post(
            userId = (count + 1),
            photoURL = urlList[count],
            caption = captionList[count],
            vaulted = False
        )

        count = count + 1
        db.session.add(new_post)

    db.session.commit()









def undo_posts():
    db.session.execute('TRUNCATE posts;')
    db.session.commit()
