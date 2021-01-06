import {util} from '../../../services/util.js'
import {storageService} from '../../../services/storageService.js'


export const MailService = {
    query,
    deleteEmail,
    addEmail,
}
var KEY = 'emailDB'
var gEmails;
_createEmails()


function query (){
    return gEmails
}

function _createEmails(){
    gEmails = storageService.loadFromStorge(KEY)
    if(!gEmails || !gEmails.length){
        gEmails = _getDemoEmails()
        _saveEmailsToStorage()
    }
}


function _getDemoEmails(){
    const defaultEmails = [

        {
            id: util.makeid(),
            subject:'Ajax updates',
            body:'The slimy bird precisely dodged because some dog passionately killed towards a beautiful dog which, became a professional, lovely boy.',
            isRead: false,
            sentAt:0
        },
        {
            id: util.makeid(),
            subject:'Invite to Vtuber',
            body:'The beautiful teacher sadly died because some bird slowly kicked down a rough bird which, became a dumb, soft plastic.',
            isRead: false,
            sentAt:0
        },
        {
            id: util.makeid(),
            subject:'Shoes on sale!',
            body:'The rough bird sadly breathed because some teacher humbly rolled below a beautiful old lady which, became a dumb, hot plastic.',
            isRead: false,
            sentAt:0
        },
        {
            id: util.makeid(),
            subject:'We have been trying to reach you about your cars extended warranty',
            body:'The vibrating professor slowly killed because some hamster calmly slept across a hot professor which, became a beautiful, slimy bird.',
            isRead: false,
            sentAt:0
        },
        {
            id: util.makeid(),
            subject:'Anime Attack on Titan Final season is out!',
            body:'The beautiful hamster sadly died because some bird slowly kicked down a vibrating clock which, became a dumb, soft boy.',
            isRead: false,
            sentAt:0
        },
        {
            id: util.makeid(),
            subject:'Trump got Elected again somehow',
            body:'The rough plastic shockingly sliced because some teacher humbly rolled below a lovely plastic which, became a hot, dumb professor.',
            isRead: false,
            sentAt:0
        },
        {
            id: util.makeid(),
            subject:'Youre order 190247 has arrived to its destination',
            body:'The dumb dog passionately kicked because some duck sadly sliced upon a slimy old lady which, became a slimy, beautiful old lady.',
            isRead: false,
            sentAt:0
        },


    ]
    return defaultEmails
}


function addEmail(email){
    email = {
        id:util.makeid(),
        ...email
    }
    gEmails = [email, ...gEmails]
    _saveEmailsToStorage()
    return Promise.resolve(email);

}

function deleteEmail(emailId){
    gEmails = gEmails.filter(email =>{
        return email.id !== emailId
    })
    _saveEmailsToStorage()
    return gEmails
}


function _saveEmailsToStorage(){
    storageService.saveToStorage(KEY,gEmails)
}