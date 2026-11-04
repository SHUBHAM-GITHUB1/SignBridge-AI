import { SignItem, TrilingualOutput } from '../types/sign.js';

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function ids(sequence: SignItem[]): string[] {
  return sequence.map(s => s.id.toUpperCase());
}

function has(idList: string[], id: string): boolean {
  return idList.includes(id.toUpperCase());
}

function hasAll(idList: string[], ...idsToCheck: string[]): boolean {
  return idsToCheck.every(id => has(idList, id));
}

/** Deduplicate consecutive identical signs (e.g. HELLO HELLO → HELLO) */
function dedupeConsecutive(sequence: SignItem[]): SignItem[] {
  const out: SignItem[] = [];
  for (const item of sequence) {
    if (out.length === 0 || out[out.length - 1].id !== item.id) {
      out.push(item);
    }
  }
  return out;
}

/** Strip isolated filler signs that add noise when combined with actual content */
const FILLER_IDS = new Set(['OK', 'WAIT']);
function stripFillers(sequence: SignItem[]): SignItem[] {
  if (sequence.length <= 1) return sequence;
  const content = sequence.filter(s => !FILLER_IDS.has(s.id));
  return content.length > 0 ? content : sequence;
}

interface PhraseTemplate {
  en: string;
  enPh: string;
  hi: string;
  hiPh: string;
  hiAcoustic: string;
  ta: string;
  taPh: string;
  taAcoustic: string;
}

type PatternMatcher = (idList: string[]) => boolean;

// ──────────────────────────────────────────────────────────────────────────────
// High-priority Idiomatic Phrases Bank (Exact matches for high-frequency needs)
// ──────────────────────────────────────────────────────────────────────────────
const PHRASE_PATTERNS: Array<[PatternMatcher, PhraseTemplate]> = [
  // ── High Urgency & Medical ─────────────────────────────────────────────────
  [t => hasAll(t, 'HELP', 'PAIN', 'DOCTOR'), {
    en: 'Emergency! I am in severe pain and need a doctor immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Eye am in suh-veer payn and need a dok-ter im-mee-dee-ut-lee!',
    hi: 'आपातकाल! मुझे बहुत तेज़ दर्द हो रहा है और तुरंत डॉक्टर चाहिए!',
    hiPh: 'Aa-paat-kaal! Mu-jhe ba-hut tez dard ho ra-haa hai aur tu-rant doc-tor chaa-hi-ye!',
    hiAcoustic: 'Aa paat kaal! Moo jhay buh hoot tayz durd ho ruh haa hay aur too runt doc tur chaa hee yay!',
    ta: 'அவசரம்! எனக்கு கடுமையான வலி உள்ளது, உடனடியாக மருத்துவர் தேவை!',
    taPh: 'A-va-sa-ram! E-nak-ku ka-du-mai-yaa-na va-li ul-la-thu, u-da-na-di-yaa-ga ma-ruth-thu-var the-vai!',
    taAcoustic: 'Uh vuh suh rum! Eh nuk koo kuh doo my yaa nuh vuh lee ool luh thoo, oo duh nuh dee yaa guh muh rooth thoo vur thay vy!'
  }],

  [t => hasAll(t, 'HELP', 'PAIN'), {
    en: 'I am in severe pain! Please help me urgently!',
    enPh: 'Pronunciation: Eye am in suh-veer payn! Pleez help mee ur-jent-lee!',
    hi: 'मदद! मुझे बहुत तेज़ दर्द हो रहा है! कृपया तुरंत सहायता करें!',
    hiPh: 'Ma-dad! Mu-jhe ba-hut tez dard ho ra-haa hai! Kri-pa-ya tu-rant sa-haa-ya-taa ka-ren!',
    hiAcoustic: 'Muh dud! Moo jhay buh hoot tayz durd ho ruh haa hay! Kri puh yaa too runt suh haa yuh taa kuh ren!',
    ta: 'உதவி! எனக்கு கடுமையான வலி உள்ளது! தயவுசெய்து உடனடியாக உதவுங்கள்!',
    taPh: 'U-tha-vi! E-nak-ku ka-du-mai-yaa-na va-li ul-la-thu! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga u-tha-vun-gal!',
    taAcoustic: 'Oo thuh vee! Eh nuk koo kuh doo my yaa nuh vuh lee ool luh thoo! Thuh yuh voo say thoo oo duh nuh dee yaa guh oo thuh voong gul!'
  }],

  [t => hasAll(t, 'HELP', 'DOCTOR'), {
    en: 'Emergency! Please call a doctor immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez kawl a dok-ter im-mee-dee-ut-lee!',
    hi: 'मदद! कृपया तुरंत डॉक्टर को बुलाइए!',
    hiPh: 'Ma-dad! Kri-pa-ya tu-rant doc-tor ko bu-laa-i-ye!',
    hiAcoustic: 'Muh dud! Kri puh yaa too runt doc tur ko boo laa ee yay!',
    ta: 'உதவி! தயவுசெய்து உடனடியாக மருத்துவரை அழையுங்கள்!',
    taPh: 'U-tha-vi! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga ma-ruth-thu-va-rai a-zhai-yun-gal!',
    taAcoustic: 'Oo thuh vee! Thuh yuh voo say thoo oo duh nuh dee yaa guh muh rooth thoo vuh rye uh zhy oong gul!'
  }],

  [t => hasAll(t, 'HELP', 'HOSPITAL'), {
    en: 'Emergency! Please take me to the hospital immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez tayk mee tu the hos-pi-tul im-mee-dee-ut-lee!',
    hi: 'मदद! कृपया मुझे तुरंत अस्पताल ले चलिए!',
    hiPh: 'Ma-dad! Kri-pa-ya mu-jhe tu-rant as-pa-taal le cha-li-ye!',
    hiAcoustic: 'Muh dud! Kri puh yaa moo jhay too runt us puh taal lay chuh lee yay!',
    ta: 'உதவி! தயவுசெய்து உடனடியாக என்னை மருத்துவமனைக்கு அழைத்துச் செல்லுங்கள்!',
    taPh: 'U-tha-vi! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga en-nai ma-ruth-thu-va-ma-nai-kku a-zhaith-thu-chel-lun-gal!',
    taAcoustic: 'Oo thuh vee! Thuh yuh voo say thoo oo duh nuh dee yaa guh en nye muh rooth thoo vuh muh nye kkoo uh zhy thoo chel loong gul!'
  }],

  [t => hasAll(t, 'HELP', 'AMBULANCE') || (has(t, 'CALL') && has(t, 'AMBULANCE')), {
    en: 'Emergency! Please call an ambulance right now!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez kawl an am-byoo-luns ryt now!',
    hi: 'आपातकाल! कृपया तुरंत एम्बुलेंस बुलाइए!',
    hiPh: 'Aa-paat-kaal! Kri-pa-ya tu-rant am-bu-lance bu-laa-i-ye!',
    hiAcoustic: 'Aa paat kaal! Kri puh yaa too runt am byoo luns boo laa ee yay!',
    ta: 'அவசரம்! தயவுசெய்து உடனடியாக ஆம்புலன்ஸ் அழையுங்கள்!',
    taPh: 'A-va-sa-ram! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga aam-bu-lans a-zhai-yun-gal!',
    taAcoustic: 'Uh vuh suh rum! Thuh yuh voo say thoo oo duh nuh dee yaa guh aam boo luns uh zhy oong gul!'
  }],

  [t => hasAll(t, 'CALL', 'POLICE'), {
    en: 'Emergency! Please call the police immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez kawl the po-lees im-mee-dee-ut-lee!',
    hi: 'आपातकाल! कृपया तुरंत पुलिस को बुलाइए!',
    hiPh: 'Aa-paat-kaal! Kri-pa-ya tu-rant pu-lis ko bu-laa-i-ye!',
    hiAcoustic: 'Aa paat kaal! Kri puh yaa too runt poo lis ko boo laa ee yay!',
    ta: 'அவசரம்! தயவுசெய்து உடனடியாக காவல்துறையை அழைக்கவும்!',
    taPh: 'A-va-sa-ram! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga kaa-val-thu-rai-yai a-zhai-yun-gal!',
    taAcoustic: 'Uh vuh suh rum! Thuh yuh voo say thoo oo duh nuh dee yaa guh kaa vul thoo rye yye uh zhy oong gul!'
  }],

  [t => hasAll(t, 'PAIN', 'MEDICINE'), {
    en: 'I am in pain and urgently need my medicine.',
    enPh: 'Pronunciation: Eye am in payn and ur-jent-lee need my med-i-sin.',
    hi: 'मुझे बहुत दर्द हो रहा है और तुरंत दवाई चाहिए।',
    hiPh: 'Mu-jhe ba-hut dard ho ra-haa hai aur tu-rant da-vaa-ee chaa-hi-ye.',
    hiAcoustic: 'Moo jhay buh hoot durd ho ruh haa hay aur too runt duh vaa ee chaa hee yay.',
    ta: 'எனக்கு கடுமையான வலி உள்ளது, உடனடியாக மருந்து தேவை.',
    taPh: 'E-nak-ku ka-du-mai-yaa-na va-li ul-la-thu, u-da-na-di-yaa-ga ma-run-thu the-vai.',
    taAcoustic: 'Eh nuk koo kuh doo my yaa nuh vuh lee ool luh thoo, oo duh nuh dee yaa guh muh roon thoo thay vy.'
  }],

  // ── Two-Handed Signature Greetings & Respect ─────────────────────────────────
  [t => has(t, 'NAMASTE'), {
    en: 'Namaste! I offer you my warm greetings and deepest respect.',
    enPh: 'Pronunciation: Nuh-mus-tay! Eye of-fer yoo my wawrm gree-tings and ree-spekt.',
    hi: 'नमस्ते! मैं आपको प्रणाम और सादर नमस्कार करता हूँ।',
    hiPh: 'Na-mas-te! Main aap-ko pra-naam aur saa-dar na-mas-kaar kar-taa hoon.',
    hiAcoustic: 'Nuh mus tay! Mye aap ko pruh naam aur saa dur nuh mus kaar kur taa hoon.',
    ta: 'வணக்கம்! உங்களுக்கு எனது அன்பான மரியாதையான வாழ்த்துகள்.',
    taPh: 'Va-nak-kam! Un-galuk-ku e-na-thu an-baa-na ma-ri-yaa-thai-yaa-na vaazhth-thu-gal.',
    taAcoustic: 'Vuh nuk kum! Oon guh look koo eh nuh thoo un baa nuh muh ree yaa thy yaa nuh vaazhth thoo gul.'
  }],

  // ── Standalone Politeness Responses ──────────────────────────────────────────
  [t => has(t, 'THANK_YOU') && t.length === 1, {
    en: 'Thank you very much for your kind help.',
    enPh: 'Pronunciation: Thangk yoo veh-ree much for yor kynd help.',
    hi: 'आपकी सहायता के लिए बहुत-बहुत धन्यवाद।',
    hiPh: 'Aap-kee sa-haa-ya-taa ke li-ye ba-hut dhan-ya-vaad.',
    hiAcoustic: 'Aap kee suh haa yuh taa kay lee yay buh hoot dhun yuh vaad.',
    ta: 'உங்கள் உதவிக்கு மிக்க நன்றி.',
    taPh: 'Un-gal u-tha-vik-ku mik-ka nan-dri.',
    taAcoustic: 'Oon gul oo thuh veek koo meek kuh nun dree.'
  }],

  [t => has(t, 'YES') && t.length === 1, {
    en: 'Yes, please.',
    enPh: 'Pronunciation: Yes, pleez.',
    hi: 'हाँ, कृपया।',
    hiPh: 'Haan, kri-pa-ya.',
    hiAcoustic: 'Haan, kri puh yaa.',
    ta: 'ஆம், தயவுசெய்து.',
    taPh: 'Aam, tha-ya-vu-sey-thu.',
    taAcoustic: 'Aam, thuh yuh voo say thoo.'
  }],

  [t => has(t, 'NO') && t.length === 1, {
    en: 'No, thank you.',
    enPh: 'Pronunciation: No, thangk yoo.',
    hi: 'नहीं, धन्यवाद।',
    hiPh: 'Na-heen, dhan-ya-vaad.',
    hiAcoustic: 'Nuh heen, dhun yuh vaad.',
    ta: 'இல்லை, நன்றி.',
    taPh: 'Il-lai, nan-dri.',
    taAcoustic: 'Eel ly, nun dree.'
  }],

  [t => has(t, 'PLEASE') && t.length === 1, {
    en: 'Please, if you would be so kind.',
    enPh: 'Pronunciation: Pleez, if yoo wood bee soh kynd.',
    hi: 'कृपया, यदि आप कृपा करें।',
    hiPh: 'Kri-pa-ya, ya-di aap kri-paa ka-ren.',
    hiAcoustic: 'Kri puh yaa, yuh dee aap kri paa kuh ren.',
    ta: 'தயவுசெய்து, உங்கள் அன்புக்கு நன்றி.',
    taPh: 'Tha-ya-vu-sey-thu, un-gal an-buk-ku nan-dri.',
    taAcoustic: 'Thuh yuh voo say thoo, oon gul un book koo nun dree.'
  }],

  [t => has(t, 'SORRY') && t.length === 1, {
    en: 'I am sincerely sorry, please excuse me.',
    enPh: 'Pronunciation: Eye am sin-seer-lee sor-ree, pleez eks-kyooz mee.',
    hi: 'मुझे बहुत खेद है, कृपया मुझे माफ़ करें।',
    hiPh: 'Mu-jhe ba-hut khed hai, kri-pa-ya mu-jhe maaf ka-ren.',
    hiAcoustic: 'Moo jhay buh hoot khayd hay, kri puh yaa moo jhay maaf kuh ren.',
    ta: 'நான் மனதார மன்னிப்பு கேட்டுக்கொள்கிறேன்.',
    taPh: 'Naan ma-na-thaa-ra man-nip-pu ket-tuk-kol-gi-ren.',
    taAcoustic: 'Naan muh nuh thaa ruh mun neep poo kayt took kol gee ren.'
  }],

  [t => has(t, 'OK') && t.length === 1, {
    en: 'Yes, that is completely fine and understood.',
    enPh: 'Pronunciation: Yes, that iz kum-pleet-lee fyn and un-der-stood.',
    hi: 'हाँ, बिल्कुल ठीक है, मैं समझ गया।',
    hiPh: 'Haan, bil-kul theek hai, main sa-majh ga-yaa.',
    hiAcoustic: 'Haan, bil kool theek hay, mye suh mujh guh yaa.',
    ta: 'ஆம், முற்றிலும் சரி, புரிந்து கொண்டேன்.',
    taPh: 'Aam, mut-ri-lum sa-ri, pu-rin-thu kon-den.',
    taAcoustic: 'Aam, moot ree loom suh ree, poo reen thoo kon dayn.'
  }],

  [t => has(t, 'HELLO') && t.length === 1, {
    en: 'Hello! How are you doing today?',
    enPh: 'Pronunciation: Heh-loh! How are yoo doo-ing tu-day?',
    hi: 'नमस्ते! आज आप कैसे हैं?',
    hiPh: 'Na-mas-te! Aaj aap kai-se hain?',
    hiAcoustic: 'Nuh mus tay! Aaj aap kay say hain?',
    ta: 'வணக்கம்! இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?',
    taPh: 'Va-nak-kam! In-ru neen-gal ep-pa-di i-ruk-ki-reer-gal?',
    taAcoustic: 'Vuh nuk kum! Een roo neen gul ep puh dee ee rook kee reer gul?'
  }]
];

// ──────────────────────────────────────────────────────────────────────────────
// Semantic Lexicon Model for Dynamic Grammar Synthesis
// ──────────────────────────────────────────────────────────────────────────────
interface SemanticMetadata {
  en: string;
  hi: string;
  hiPh: string;
  ta: string;
  taPh: string;
  type: 'facility' | 'person' | 'item' | 'state' | 'action' | 'greeting' | 'polite' | 'question' | 'modifier';
}

const SEMANTIC_VOCAB: Record<string, SemanticMetadata> = {
  // Facilities & Locations
  HOSPITAL: { en: 'hospital', hi: 'अस्पताल', hiPh: 'as-pa-taal', ta: 'மருத்துவமனை', taPh: 'ma-ruth-thu-va-ma-nai', type: 'facility' },
  BATHROOM: { en: 'restroom', hi: 'शौचालय', hiPh: 'shau-chaa-lay', ta: 'கழிப்பறை', taPh: 'ka-zhip-pa-rai', type: 'facility' },
  HOME:     { en: 'home', hi: 'घर', hiPh: 'ghar', ta: 'வீடு', taPh: 'vee-du', type: 'facility' },
  WORK:     { en: 'work', hi: 'काम', hiPh: 'kaam', ta: 'வேலை', taPh: 've-lai', type: 'facility' },
  POLICE:   { en: 'police station', hi: 'पुलिस', hiPh: 'pu-lis', ta: 'காவல்துறை', taPh: 'kaa-val-thu-rai', type: 'facility' },
  AMBULANCE:{ en: 'ambulance', hi: 'एम्बुलेंस', hiPh: 'am-bu-lance', ta: 'ஆம்புலன்ஸ்', taPh: 'aam-bu-lans', type: 'facility' },

  // Persons
  DOCTOR:   { en: 'doctor', hi: 'डॉक्टर', hiPh: 'doc-tor', ta: 'மருத்துவர்', taPh: 'ma-ruth-thu-var', type: 'person' },
  FAMILY:   { en: 'family', hi: 'परिवार', hiPh: 'pa-ri-vaar', ta: 'குடும்பம்', taPh: 'ku-dum-bam', type: 'person' },
  MOTHER:   { en: 'mother', hi: 'माँ', hiPh: 'maa', ta: 'அம்மா', taPh: 'am-maa', type: 'person' },
  FATHER:   { en: 'father', hi: 'पिताजी', hiPh: 'pi-taa-jee', ta: 'அப்பா', taPh: 'ap-paa', type: 'person' },
  FRIEND:   { en: 'friend', hi: 'दोस्त', hiPh: 'dost', ta: 'நண்பர்', taPh: 'nan-bar', type: 'person' },

  // Items & Objects
  WATER:    { en: 'water', hi: 'पानी', hiPh: 'paa-nee', ta: 'தண்ணீர்', taPh: 'than-neer', type: 'item' },
  FOOD:     { en: 'food', hi: 'खाना', hiPh: 'khaa-naa', ta: 'உணவு', taPh: 'u-na-vu', type: 'item' },
  DRINK:    { en: 'drinking water', hi: 'पीने का पानी', hiPh: 'pee-ne kaa paa-nee', ta: 'குடிநீர்', taPh: 'ku-di-neer', type: 'item' },
  MEDICINE: { en: 'medicine', hi: 'दवाई', hiPh: 'da-vaa-ee', ta: 'மருந்து', taPh: 'ma-run-thu', type: 'item' },
  BOOK:     { en: 'book', hi: 'किताब', hiPh: 'ki-taab', ta: 'புத்தகம்', taPh: 'puth-tha-gam', type: 'item' },
  MONEY:    { en: 'money', hi: 'पैसे', hiPh: 'pai-se', ta: 'பணம்', taPh: 'pa-nam', type: 'item' },
  PHONE:    { en: 'phone', hi: 'फ़ोन', hiPh: 'phone', ta: 'தொலைபேசி', taPh: 'tho-lai-pe-si', type: 'item' },

  // States & Feelings
  PAIN:     { en: 'pain', hi: 'दर्द', hiPh: 'dard', ta: 'வலி', taPh: 'va-li', type: 'state' },
  SICK:     { en: 'sick', hi: 'बीमार', hiPh: 'bee-maar', ta: 'உடல்நிலை சரியில்லை', taPh: 'u-dal-ni-lai sa-ri-yil-lai', type: 'state' },
  HURT:     { en: 'hurt', hi: 'चोट', hiPh: 'chot', ta: 'காயம்', taPh: 'kaa-yam', type: 'state' },
  TIRED:    { en: 'tired', hi: 'थका हुआ', hiPh: 'tha-kaa hu-aa', ta: 'சோர்வு', taPh: 'sor-vu', type: 'state' },
  HUNGRY:   { en: 'hungry', hi: 'भूख', hiPh: 'bhookh', ta: 'பசி', taPh: 'pa-si', type: 'state' },
  SLEEP:    { en: 'sleep', hi: 'सोना', hiPh: 'so-naa', ta: 'தூக்கம்', taPh: 'thook-kam', type: 'state' },
  HAPPY:    { en: 'happy', hi: 'खुश', hiPh: 'khush', ta: 'மகிழ்ச்சி', taPh: 'ma-gizh-chi', type: 'state' },
  SAD:      { en: 'sad', hi: 'उदास', hiPh: 'u-daas', ta: 'சோகம்', taPh: 'so-gam', type: 'state' },
  GOOD:     { en: 'good', hi: 'अच्छा', hiPh: 'ach-chaa', ta: 'நல்லது', taPh: 'nal-la-thu', type: 'state' },
  BAD:      { en: 'bad', hi: 'खराब', hiPh: 'kha-raab', ta: 'மோசம்', taPh: 'mo-sam', type: 'state' },

  // Actions
  CALL:     { en: 'call', hi: 'बुलाना', hiPh: 'bu-laa-naa', ta: 'அழைக்க', taPh: 'a-zhaik-ka', type: 'action' },
  WAIT:     { en: 'wait', hi: 'रुकना', hiPh: 'ruk-naa', ta: 'காத்திருங்கள்', taPh: 'kaath-thi-run-gal', type: 'action' },
  FINISH:   { en: 'finished', hi: 'पूरा हो गया', hiPh: 'poo-raa ho ga-yaa', ta: 'முடிந்தது', taPh: 'mu-dain-tha-thu', type: 'action' },
  UNDERSTAND:{ en: 'understand', hi: 'समझना', hiPh: 'sa-majh-naa', ta: 'புரிகிறது', taPh: 'pu-ri-gi-ra-thu', type: 'action' },
  REPEAT:   { en: 'repeat', hi: 'दोहराना', hiPh: 'doh-raa-naa', ta: 'மீண்டும்', taPh: 'meen-dum', type: 'action' },
  HELP:     { en: 'help', hi: 'मदद', hiPh: 'ma-dad', ta: 'உதவி', taPh: 'u-tha-vi', type: 'action' },
};

// ──────────────────────────────────────────────────────────────────────────────
// Dynamic Syntactic Grammar Assembler (Forms Fluent Natural Sentences)
// ──────────────────────────────────────────────────────────────────────────────
function synthesizeSemanticSentence(signs: SignItem[]): TrilingualOutput {
  const signIds = signs.map(s => s.id.toUpperCase());

  const hasPlease   = signIds.includes('PLEASE');
  const hasThanks   = signIds.includes('THANK_YOU');
  const hasSorry    = signIds.includes('SORRY');
  const hasWhere    = signIds.includes('WHERE');
  const hasMore     = signIds.includes('MORE');
  const hasCall     = signIds.includes('CALL');
  const hasHelp     = signIds.includes('HELP');

  const facility = signs.find(s => SEMANTIC_VOCAB[s.id]?.type === 'facility');
  const person   = signs.find(s => SEMANTIC_VOCAB[s.id]?.type === 'person');
  const item     = signs.find(s => SEMANTIC_VOCAB[s.id]?.type === 'item');
  const state    = signs.find(s => SEMANTIC_VOCAB[s.id]?.type === 'state');
  const action   = signs.find(s => SEMANTIC_VOCAB[s.id]?.type === 'action');

  let enCore = '';
  let hiCore = '';
  let taCore = '';
  let hiPhCore = '';
  let taPhCore = '';

  // ── RULE 1: Question & Where Locational Queries ─────────────────────────────
  if (hasWhere) {
    if (facility) {
      const meta = SEMANTIC_VOCAB[facility.id];
      enCore = `where is the ${meta.en}`;
      hiCore = `${meta.hi} कहाँ है`;
      taCore = `${meta.ta} எங்கே உள்ளது`;
      hiPhCore = `${meta.hiPh} ka-haan hai`;
      taPhCore = `${meta.taPh} en-ge ul-la-thu`;
    } else if (person) {
      const meta = SEMANTIC_VOCAB[person.id];
      if (['MOTHER', 'FATHER', 'FAMILY', 'FRIEND'].includes(person.id)) {
        enCore = `could you help me find my ${meta.en}`;
        hiCore = `कृपया मेरे ${meta.hi} को ढूँढने में मेरी मदद करें`;
        taCore = `தயவுசெய்து என் ${meta.ta} கண்டுபிடிக்க உதவுங்கள்`;
        hiPhCore = `kri-pa-ya me-re ${meta.hiPh} ko dhoondh-ne mein me-ree ma-dad ka-ren`;
        taPhCore = `tha-ya-vu-sey-thu en ${meta.taPh} kan-du-pi-dik-ka u-tha-vun-gal`;
      } else {
        enCore = `where is the ${meta.en}`;
        hiCore = `${meta.hi} कहाँ हैं`;
        taCore = `${meta.ta} எங்கே உள்ளார்`;
        hiPhCore = `${meta.hiPh} ka-haan hain`;
        taPhCore = `${meta.taPh} en-ge ul-laar`;
      }
    } else if (item) {
      const meta = SEMANTIC_VOCAB[item.id];
      enCore = `where can I get ${meta.en}`;
      hiCore = `${meta.hi} कहाँ मिलेगा`;
      taCore = `${meta.ta} எங்கே கிடைக்கும்`;
      hiPhCore = `${meta.hiPh} ka-haan mi-le-ga`;
      taPhCore = `${meta.taPh} en-ge ki-daik-kum`;
    } else {
      enCore = `where is it located`;
      hiCore = `यह कहाँ स्थित है`;
      taCore = `இது எங்கே உள்ளது`;
      hiPhCore = `yeh ka-haan sthit hai`;
      taPhCore = `i-thu en-ge ul-la-thu`;
    }
  }

  // ── RULE 2: Emergency & Calling Assistance ─────────────────────────────────
  else if (hasCall || (hasHelp && (facility || person))) {
    if (signIds.includes('AMBULANCE')) {
      enCore = `please call an ambulance right now`;
      hiCore = `कृपया तुरंत एम्बुलेंस को कॉल करें`;
      taCore = `தயவுசெய்து உடனடியாக ஆம்புலன்ஸ் அழையுங்கள்`;
      hiPhCore = `kri-pa-ya tu-rant am-bu-lance ko call ka-ren`;
      taPhCore = `tha-ya-vu-sey-thu u-da-na-di-yaa-ga aam-bu-lans a-zhai-yun-gal`;
    } else if (signIds.includes('POLICE')) {
      enCore = `emergency, please call the police immediately`;
      hiCore = `आपातकाल, कृपया तुरंत पुलिस को बुलाइए`;
      taCore = `அவசரம், தயவுசெய்து உடனடியாக காவல்துறையை அழைக்கவும்`;
      hiPhCore = `aa-paat-kaal, kri-pa-ya tu-rant pu-lis ko bu-laa-i-ye`;
      taPhCore = `a-va-sa-ram, tha-ya-vu-sey-thu u-da-na-di-yaa-ga kaa-val-thu-rai-yai a-zhai-yun-gal`;
    } else if (signIds.includes('DOCTOR')) {
      enCore = `please call a doctor for me`;
      hiCore = `कृपया मेरे लिए तुरंत डॉक्टर को बुलाइए`;
      taCore = `தயவுசெய்து எனக்காக உடனடியாக மருத்துவரை அழைக்கவும்`;
      hiPhCore = `kri-pa-ya me-re li-ye tu-rant doc-tor ko bu-laa-i-ye`;
      taPhCore = `tha-ya-vu-sey-thu e-nak-kaa-ga u-da-na-di-yaa-ga ma-ruth-thu-va-rai a-zhai-yun-gal`;
    } else if (person) {
      const meta = SEMANTIC_VOCAB[person.id];
      enCore = `please contact my ${meta.en}`;
      hiCore = `कृपया मेरे ${meta.hi} से बात कराइए`;
      taCore = `தயவுசெய்து என் ${meta.ta} தொடர்பு கொள்ளுங்கள்`;
      hiPhCore = `kri-pa-ya me-re ${meta.hiPh} se baat ka-raa-i-ye`;
      taPhCore = `tha-ya-vu-sey-thu en ${meta.taPh} thod-ar-pu kol-lun-gal`;
    } else {
      enCore = `please help me urgently`;
      hiCore = `कृपया तुरंत मेरी सहायता करें`;
      taCore = `தயவுசெய்து உடனே எனக்கு உதவுங்கள்`;
      hiPhCore = `kri-pa-ya tu-rant me-ree sa-haa-ya-taa ka-ren`;
      taPhCore = `tha-ya-vu-sey-thu u-da-ne e-nak-ku u-tha-vun-gal`;
    }
  }

  // ── RULE 3: State + Action / Destination Pairing ───────────────────────────
  else if (state && facility && state.id === 'TIRED' && facility.id === 'HOME') {
    enCore = `I am very tired and want to go home`;
    hiCore = `मैं बहुत थक गया हूँ और घर जाना चाहता हूँ`;
    taCore = `நான் மிகவும் சோர்வாக இருக்கிறேன், வீட்டிற்கு செல்ல வேண்டும்`;
    hiPhCore = `main ba-hut thak ga-yaa hoon aur ghar jaa-naa chaah-taa hoon`;
    taPhCore = `naan mi-ga-vum sor-vaa-ga iruk-ki-ren, veet-tir-ku sel-la ven-dum`;
  } else if (state && state.id === 'TIRED' && signIds.includes('SLEEP')) {
    enCore = `I am exhausted and urgently need to rest and sleep`;
    hiCore = `मैं बहुत थक गया हूँ और मुझे सोने की ज़रूरत है`;
    taCore = `நான் மிகவும் சோர்வாக இருக்கிறேன், தூங்க வேண்டும்`;
    hiPhCore = `main ba-hut thak ga-yaa hoon aur mu-jhe so-ne kee za-roo-rat hai`;
    taPhCore = `naan mi-ga-vum sor-vaa-ga iruk-ki-ren, thoon-ga ven-dum`;
  } else if (state && (state.id === 'PAIN' || state.id === 'HURT')) {
    if (item && item.id === 'MEDICINE') {
      enCore = `I am in severe pain and need my medicine`;
      hiCore = `मुझे बहुत दर्द हो रहा है और दवाई की ज़रूरत है`;
      taCore = `எனக்கு கடுமையான வலி உள்ளது, மருந்து தேவை`;
      hiPhCore = `mu-jhe ba-hut dard ho ra-haa hai aur da-vaa-ee kee za-roo-rat hai`;
      taPhCore = `e-nak-ku ka-du-mai-yaa-na va-li ul-la-thu, ma-run-thu the-vai`;
    } else if (person && person.id === 'DOCTOR') {
      enCore = `I am in pain and need to see a doctor`;
      hiCore = `मुझे दर्द हो रहा है और डॉक्टर को दिखाना है`;
      taCore = `எனக்கு வலி இருக்கிறது, மருத்துவரை பார்க்க வேண்டும்`;
      hiPhCore = `mu-jhe dard ho ra-haa hai aur doc-tor ko di-khaa-naa hai`;
      taPhCore = `e-nak-ku va-li iruk-ki-ra-thu, ma-ruth-thu-va-rai paar-kka ven-dum`;
    } else {
      enCore = `I am experiencing pain, please help`;
      hiCore = `मुझे बहुत दर्द हो रहा है, कृपया सहायता करें`;
      taCore = `எனக்கு வலி இருக்கிறது, தயவுசெய்து உதவுங்கள்`;
      hiPhCore = `mu-jhe ba-hut dard ho ra-haa hai, kri-pa-ya sa-haa-ya-taa ka-ren`;
      taPhCore = `e-nak-ku va-li iruk-ki-ra-thu, tha-ya-vu-sey-thu u-tha-vun-gal`;
    }
  } else if (state && state.id === 'HUNGRY') {
    enCore = `I am hungry and need something to eat`;
    hiCore = `मुझे बहुत भूख लगी है और खाने के लिए कुछ चाहिए`;
    taCore = `எனக்கு பசிக்கிறது, உணவு ஏதாவது வேண்டும்`;
    hiPhCore = `mu-jhe ba-hut bhookh la-gee hai aur khaa-ne ke li-ye kuchh chaa-hi-ye`;
    taPhCore = `e-nak-ku pa-sik-ki-ra-thu, u-na-vu e-thaa-va-thu ven-dum`;
  } else if (state && state.id === 'SICK') {
    enCore = `I am feeling sick and not well`;
    hiCore = `मेरी तबीयत ठीक नहीं है, मैं बीमार महसूस कर रहा हूँ`;
    taCore = `எனக்கு உடல்நிலை சரியில்லை, நோய்வாய்ப்பட்டுள்ளேன்`;
    hiPhCore = `me-ree ta-bee-yat theek na-heen hai, main bee-maar mah-soos kar ra-haa hoon`;
    taPhCore = `e-nak-ku u-dal-ni-lai sa-ri-yil-lai, noi-vaayp-pat-tul-len`;
  }

  // ── RULE 4: Item Requisition (`hasMore`, `hasNeed`, or plain items) ─────────
  else if (item) {
    const meta = SEMANTIC_VOCAB[item.id];
    if (hasMore) {
      enCore = `could I please have some more ${meta.en}`;
      hiCore = `कृपया थोड़ा और ${meta.hi} मिल सकता है`;
      taCore = `தயவுசெய்து மேலும் கொஞ்சம் ${meta.ta} கிடைக்குமா`;
      hiPhCore = `kri-pa-ya tho-da aur ${meta.hiPh} mil sak-taa hai`;
      taPhCore = `tha-ya-vu-sey-thu me-lum kon-jam ${meta.taPh} ki-daik-ku-maa`;
    } else {
      enCore = `I need some ${meta.en}`;
      hiCore = `मुझे ${meta.hi} चाहिए`;
      taCore = `எனக்கு ${meta.ta} வேண்டும்`;
      hiPhCore = `mu-jhe ${meta.hiPh} chaa-hi-ye`;
      taPhCore = `e-nak-ku ${meta.taPh} ven-dum`;
    }
  }

  // ── RULE 5: Emotional States ───────────────────────────────────────────────
  else if (state && state.id === 'HAPPY') {
    enCore = `I am feeling very happy today`;
    hiCore = `मैं आज बहुत खुश महसूस कर रहा हूँ`;
    taCore = `நான் இன்று மிகவும் மகிழ்ச்சியாக உணர்கிறேன்`;
    hiPhCore = `main aaj ba-hut khush mah-soos kar ra-haa hoon`;
    taPhCore = `naan in-ru mi-ga-vum ma-gizh-chi-yaa-ga u-nar-gi-ren`;
  } else if (state && state.id === 'SAD') {
    enCore = `I am feeling down and sad`;
    hiCore = `मैं बहुत उदास और दुखी महसूस कर रहा हूँ`;
    taCore = `நான் மிகவும் சோகமாக உணர்கிறேன்`;
    hiPhCore = `main ba-hut u-daas aur du-khee mah-soos kar ra-haa hoon`;
    taPhCore = `naan mi-ga-vum so-ga-maa-ga u-nar-gi-ren`;
  } else if (state && state.id === 'GOOD') {
    enCore = `I am feeling good and doing well`;
    hiCore = `मैं बिल्कुल अच्छा और स्वस्थ महसूस कर रहा हूँ`;
    taCore = `நான் நன்றாக நலமாக இருக்கிறேன்`;
    hiPhCore = `main bil-kul ach-chaa aur swasth mah-soos kar ra-haa hoon`;
    taPhCore = `naan nan-raa-ga na-la-maa-ga iruk-ki-ren`;
  } else if (state && state.id === 'BAD') {
    enCore = `I am not doing well`;
    hiCore = `मेरी हालत बिल्कुल अच्छी नहीं है`;
    taCore = `நான் நன்றாக உணரவில்லை`;
    hiPhCore = `me-ree haa-lat bil-kul ach-chhee na-heen hai`;
    taPhCore = `naan nan-raa-ga u-na-ra-vil-lai`;
  }

  // ── RULE 6: Action-only expressions ─────────────────────────────────────────
  else if (action && action.id === 'WAIT') {
    enCore = `please wait a moment`;
    hiCore = `कृपया एक पल रुकिए`;
    taCore = `தயவுசெய்து ஒரு நிமிடம் காத்திருங்கள்`;
    hiPhCore = `kri-pa-ya ek pal ru-ki-ye`;
    taPhCore = `tha-ya-vu-sey-thu o-ru ni-mi-dam kaath-thi-run-gal`;
  } else if (action && action.id === 'FINISH') {
    enCore = `I am done and finished`;
    hiCore = `मेरा काम पूरा हो गया है`;
    taCore = `நான் வேலையை முடித்துவிட்டேன்`;
    hiPhCore = `me-raa kaam poo-raa ho ga-yaa hai`;
    taPhCore = `naan ve-lai-yai mu-dith-thu-vit-ten`;
  } else if (action && action.id === 'REPEAT') {
    enCore = `could you please repeat that once more`;
    hiCore = `कृपया एक बार फिर से दोहराइए`;
    taCore = `தயவுசெய்து மீண்டும் ஒருமுறை சொல்லுங்கள்`;
    hiPhCore = `kri-pa-ya ek baar phir se doh-raa-i-ye`;
    taPhCore = `tha-ya-vu-sey-thu meen-dum o-ru-mu-rai sol-lun-gal`;
  } else if (action && action.id === 'UNDERSTAND') {
    if (signIds.includes('NO')) {
      enCore = `I do not understand, please explain`;
      hiCore = `मुझे समझ नहीं आया, कृपया दोबारा समझाएँ`;
      taCore = `எனக்கு புரியவில்லை, மீண்டும் விளக்குங்கள்`;
      hiPhCore = `mu-jhe sa-majh na-heen aa-yaa, kri-pa-ya do-baa-raa sam-jhaa-en`;
      taPhCore = `e-nak-ku pu-ri-ya-vil-lai, meen-dum vi-lak-kun-gal`;
    } else {
      enCore = `I understand clearly`;
      hiCore = `मैं अच्छी तरह समझ गया`;
      taCore = `எனக்கு தெளிவாக புரிகிறது`;
      hiPhCore = `main ach-chhee ta-rah sa-majh ga-yaa`;
      taPhCore = `e-nak-ku the-li-vaa-ga pu-ri-gi-ra-thu`;
    }
  }

  // ── Fallback Cohesive Assembly (if novel sequence doesn't hit macro rules) ──
  if (!enCore) {
    const enTokens = signs.filter(s => !['PLEASE', 'HELLO', 'OK'].includes(s.id)).map(s => s.en.split('/')[0].trim());
    const hiTokens = signs.filter(s => !['PLEASE', 'HELLO', 'OK'].includes(s.id)).map(s => s.hi.split('/')[0].trim());
    const taTokens = signs.filter(s => !['PLEASE', 'HELLO', 'OK'].includes(s.id)).map(s => s.ta.split('/')[0].trim());

    enCore = enTokens.join(' ');
    hiCore = hiTokens.join(' ');
    taCore = taTokens.join(' ');
  }

  // ── Conversational Framing & Politeness Synthesis ──────────────────────────
  let finalEn = enCore;
  let finalHi = hiCore;
  let finalTa = taCore;

  // Add Greetings Prefix
  if (signIds.includes('HELLO')) {
    finalEn = `Hello, ${finalEn}`;
    finalHi = `नमस्ते, ${finalHi}`;
    finalTa = `வணக்கம், ${finalTa}`;
  } else if (signIds.includes('NAMASTE')) {
    finalEn = `Namaste, ${finalEn}`;
    finalHi = `प्रणाम, ${finalHi}`;
    finalTa = `வணக்கம், ${finalTa}`;
  } else if (signIds.includes('MORNING')) {
    finalEn = `Good morning, ${finalEn}`;
    finalHi = `शुभ प्रभात, ${finalHi}`;
    finalTa = `காலை வணக்கம், ${finalTa}`;
  } else if (signIds.includes('NIGHT')) {
    finalEn = `Good night, ${finalEn}`;
    finalHi = `शुभ रात्रि, ${finalHi}`;
    finalTa = `இரவு வணக்கம், ${finalTa}`;
  }

  // Add Apology Prefix
  if (hasSorry && !finalEn.toLowerCase().startsWith('excuse me')) {
    finalEn = `Excuse me, ${finalEn}`;
    finalHi = `माफ़ कीजिए, ${finalHi}`;
    finalTa = `மன்னிக்கவும், ${finalTa}`;
  }

  // Add Politeness Modifier
  if (hasPlease) {
    if (!finalEn.toLowerCase().includes('please')) {
      finalEn = `${finalEn}, please`;
    }
    if (!finalHi.includes('कृपया')) {
      finalHi = `कृपया ${finalHi}`;
    }
    if (!finalTa.includes('தயவுசெய்து')) {
      finalTa = `தயவுசெய்து ${finalTa}`;
    }
  }

  // Add Gratitude Suffix
  if (hasThanks) {
    finalEn = `${finalEn}. Thank you very much.`;
    finalHi = `${finalHi}। बहुत-बहुत धन्यवाद।`;
    finalTa = `${finalTa}. மிக்க நன்றி.`;
  }

  // Proper Sentence Punctuation
  finalEn = cap(finalEn.trim());
  if (!finalEn.endsWith('?') && !finalEn.endsWith('!') && !finalEn.endsWith('.')) {
    finalEn += (hasWhere ? '?' : '.');
  }

  finalHi = finalHi.trim();
  if (!finalHi.endsWith('?') && !finalHi.endsWith('!') && !finalHi.endsWith('।')) {
    finalHi += (hasWhere ? '?' : '।');
  }

  finalTa = finalTa.trim();
  if (!finalTa.endsWith('?') && !finalTa.endsWith('!') && !finalTa.endsWith('.')) {
    finalTa += (hasWhere ? '?' : '.');
  }

  const hiPhDisplay = hiPhCore || signs.map(s => s.hiPh.split('/')[0].trim()).join(', ');
  const taPhDisplay = taPhCore || signs.map(s => s.taPh.split('/')[0].trim()).join(', ');

  return {
    en: finalEn,
    enPh: 'Pronunciation: ' + signs.map(s => s.en.split('/')[0].trim()).join(' - '),
    hi: finalHi,
    hiPh: hiPhDisplay,
    hiAcoustic: hiPhDisplay.replace(/-/g, ' '),
    ta: finalTa,
    taPh: taPhDisplay,
    taAcoustic: taPhDisplay.replace(/-/g, ' ')
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Export (Instant 0ms Sentence Composition)
// ──────────────────────────────────────────────────────────────────────────────
export function composeDeterministicTrilingual(sequence: SignItem[]): TrilingualOutput {
  if (sequence.length === 0) {
    return {
      en: 'Awaiting your sign language gestures...',
      hi: 'आपके सांकेतिक भाषा के इशारों की प्रतीक्षा है...',
      ta: 'உங்கள் சைகை மொழி அசைவுகளுக்காக காத்திருக்கிறது...'
    };
  }

  // 1. Clean consecutive duplicates and noise fillers
  const cleaned = stripFillers(dedupeConsecutive(sequence));
  const idList = ids(cleaned);

  // 2. Check High-Priority Idiomatic Phrase Bank
  for (const [matcher, template] of PHRASE_PATTERNS) {
    if (matcher(idList)) {
      return { ...template };
    }
  }

  // 3. Run Semantic Syntactic Sentence Synthesizer for arbitrary combinations
  return synthesizeSemanticSentence(cleaned);
}
