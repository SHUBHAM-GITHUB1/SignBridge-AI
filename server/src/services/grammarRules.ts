/**
 * Server-side grammar rule composer — mirrors and expands client deterministic composition.
 * Used when GEMINI_API_KEY is not configured or for instant 0ms responses, producing
 * polished, meaningful, natural sentences across 60+ Indian assistive conversational contexts.
 */

export interface GrammarResult {
  en: string;
  enPh?: string;
  hi: string;
  hiPh?: string;
  hiAcoustic?: string;
  ta: string;
  taPh?: string;
  taAcoustic?: string;
  source: 'grammar' | 'dictionary';
}

type Matcher = (tokens: string[]) => boolean;

function has(t: string[], id: string): boolean {
  return t.includes(id.toUpperCase());
}

function hasAll(t: string[], ...ids: string[]): boolean {
  return ids.every(id => has(t, id));
}

function hasAny(t: string[], ...ids: string[]): boolean {
  return ids.some(id => has(t, id));
}

export const PATTERNS: Array<[Matcher, GrammarResult]> = [
  // ────────────────────────────────────────────────────────────────────────────
  // 1. EMERGENCY & MEDICAL HIGH URGENCY
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'HELP', 'PAIN', 'DOCTOR'), {
    en: 'Emergency! I am in severe pain and need a doctor immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Eye am in suh-veer payn and need a dok-ter im-mee-dee-ut-lee!',
    hi: 'आपातकाल! मुझे बहुत तेज़ दर्द हो रहा है और तुरंत डॉक्टर चाहिए!',
    hiPh: 'Aa-paat-kaal! Mu-jhe ba-hut tez dard ho ra-haa hai aur tu-rant doc-tor chaa-hi-ye!',
    hiAcoustic: 'Aa paat kaal! Moo jhay buh hoot tayz durd ho ruh haa hay aur too runt doc tur chaa hee yay!',
    ta: 'அவசரம்! எனக்கு கடுமையான வலி உள்ளது, உடனடியாக மருத்துவர் தேவை!',
    taPh: 'A-va-sa-ram! E-nak-ku ka-du-mai-yaa-na va-li ul-la-thu, u-da-na-di-yaa-ga ma-ruth-thu-var the-vai!',
    taAcoustic: 'Uh vuh suh rum! Eh nuk koo kuh doo my yaa nuh vuh lee ool luh thoo, oo duh nuh dee yaa guh muh rooth thoo vur thay vy!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HELP', 'PAIN'), {
    en: 'I am in severe pain! Please help me urgently!',
    enPh: 'Pronunciation: Eye am in suh-veer payn! Pleez help mee ur-jent-lee!',
    hi: 'मदद! मुझे बहुत तेज़ दर्द हो रहा है! कृपया तुरंत सहायता करें!',
    hiPh: 'Ma-dad! Mu-jhe ba-hut tez dard ho ra-haa hai! Kri-pa-ya tu-rant sa-haa-ya-taa ka-ren!',
    hiAcoustic: 'Muh dud! Moo jhay buh hoot tayz durd ho ruh haa hay! Kri puh yaa too runt suh haa yuh taa kuh ren!',
    ta: 'உதவி! எனக்கு கடுமையான வலி உள்ளது! தயவுசெய்து உடனடியாக உதவுங்கள்!',
    taPh: 'U-tha-vi! E-nak-ku ka-du-mai-yaa-na va-li ul-la-thu! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga u-tha-vun-gal!',
    taAcoustic: 'Oo thuh vee! Eh nuk koo kuh doo my yaa nuh vuh lee ool luh thoo! Thuh yuh voo say thoo oo duh nuh dee yaa guh oo thuh voong gul!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HELP', 'DOCTOR'), {
    en: 'Emergency! Please call a doctor immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez kawl a dok-ter im-mee-dee-ut-lee!',
    hi: 'मदद! कृपया तुरंत डॉक्टर को बुलाइए!',
    hiPh: 'Ma-dad! Kri-pa-ya tu-rant doc-tor ko bu-laa-i-ye!',
    hiAcoustic: 'Muh dud! Kri puh yaa too runt doc tur ko boo laa ee yay!',
    ta: 'உதவி! தயவுசெய்து உடனடியாக மருத்துவரை அழையுங்கள்!',
    taPh: 'U-tha-vi! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga ma-ruth-thu-va-rai a-zhai-yun-gal!',
    taAcoustic: 'Oo thuh vee! Thuh yuh voo say thoo oo duh nuh dee yaa guh muh rooth thoo vuh rye uh zhy oong gul!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HELP', 'HOSPITAL'), {
    en: 'Emergency! Please take me to the hospital immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez tayk mee tu the hos-pi-tul im-mee-dee-ut-lee!',
    hi: 'मदद! कृपया मुझे तुरंत अस्पताल ले चलिए!',
    hiPh: 'Ma-dad! Kri-pa-ya mu-jhe tu-rant as-pa-taal le cha-li-ye!',
    hiAcoustic: 'Muh dud! Kri puh yaa moo jhay too runt us puh taal lay chuh lee yay!',
    ta: 'உதவி! தயவுசெய்து உடனடியாக என்னை மருத்துவமனைக்கு அழைத்துச் செல்லுங்கள்!',
    taPh: 'U-tha-vi! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga en-nai ma-ruth-thu-va-ma-nai-kku a-zhaith-thu-chel-lun-gal!',
    taAcoustic: 'Oo thuh vee! Thuh yuh voo say thoo oo duh nuh dee yaa guh en nye muh rooth thoo vuh muh nye kkoo uh zhy thoo chel loong gul!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HELP', 'AMBULANCE') || (has(t, 'CALL') && has(t, 'AMBULANCE')), {
    en: 'Emergency! Please call an ambulance right now!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez kawl an am-byoo-luns ryt now!',
    hi: 'आपातकाल! कृपया तुरंत एम्बुलेंस बुलाइए!',
    hiPh: 'Aa-paat-kaal! Kri-pa-ya tu-rant am-bu-lance bu-laa-i-ye!',
    hiAcoustic: 'Aa paat kaal! Kri puh yaa too runt am byoo luns boo laa ee yay!',
    ta: 'அவசரம்! தயவுசெய்து உடனடியாக ஆம்புலன்ஸ் அழையுங்கள்!',
    taPh: 'A-va-sa-ram! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga aam-bu-lans a-zhai-yun-gal!',
    taAcoustic: 'Uh vuh suh rum! Thuh yuh voo say thoo oo duh nuh dee yaa guh aam boo luns uh zhy oong gul!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'CALL', 'POLICE'), {
    en: 'Emergency! Please call the police immediately!',
    enPh: 'Pronunciation: Ee-mer-jen-see! Pleez kawl the po-lees im-mee-dee-ut-lee!',
    hi: 'आपातकाल! कृपया तुरंत पुलिस को बुलाइए!',
    hiPh: 'Aa-paat-kaal! Kri-pa-ya tu-rant pu-lis ko bu-laa-i-ye!',
    hiAcoustic: 'Aa paat kaal! Kri puh yaa too runt poo lis ko boo laa ee yay!',
    ta: 'அவசரம்! தயவுசெய்து உடனடியாக காவல்துறையை அழைக்கவும்!',
    taPh: 'A-va-sa-ram! Tha-ya-vu-sey-thu u-da-na-di-yaa-ga kaa-val-thu-rai-yai a-zhai-yun-gal!',
    taAcoustic: 'Uh vuh suh rum! Thuh yuh voo say thoo oo duh nuh dee yaa guh kaa vul thoo rye yye uh zhy oong gul!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'CALL', 'DOCTOR'), {
    en: 'Please call a doctor for me.',
    enPh: 'Pronunciation: Pleez kawl a dok-ter for mee.',
    hi: 'कृपया मेरे लिए डॉक्टर को फ़ोन करें।',
    hiPh: 'Kri-pa-ya me-re li-ye doc-tor ko phone ka-ren.',
    hiAcoustic: 'Kri puh yaa may ray lee yay doc tur ko phone kuh ren.',
    ta: 'தயவுசெய்து எனக்காக ஒரு மருத்துவரை அழைக்கவும்.',
    taPh: 'Tha-ya-vu-sey-thu e-nak-kaa-ga o-ru ma-ruth-thu-va-rai a-zhai-yun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo eh nuk kaa guh oh roo muh rooth thoo vuh rye uh zhy oong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'PAIN', 'DOCTOR'), {
    en: 'I am in pain. I need a doctor urgently.',
    enPh: 'Pronunciation: Eye am in payn. Eye need a dok-ter ur-jent-lee.',
    hi: 'मुझे दर्द हो रहा है। मुझे तुरंत डॉक्टर की ज़रूरत है।',
    hiPh: 'Mu-jhe dard ho ra-haa hai. Mu-jhe tu-rant doc-tor kee za-roo-rat hai.',
    hiAcoustic: 'Moo jhay durd ho ruh haa hay. Moo jhay too runt doc tur kee zuh roo rut hay.',
    ta: 'எனக்கு வலி இருக்கிறது. எனக்கு உடனடியாக மருத்துவர் தேவை.',
    taPh: 'E-nak-ku va-li iruk-ki-ra-thu. E-nak-ku u-da-na-di-yaa-ga ma-ruth-thu-var the-vai.',
    taAcoustic: 'Eh nuk koo vuh lee ee rook kee ruh thoo. Eh nuk koo oo duh nuh dee yaa guh muh rooth thoo vur thay vy.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'PAIN', 'MEDICINE'), {
    en: 'I am in pain and urgently need my medicine.',
    enPh: 'Pronunciation: Eye am in payn and ur-jent-lee need my med-i-sin.',
    hi: 'मुझे बहुत दर्द हो रहा है और तुरंत दवाई चाहिए।',
    hiPh: 'Mu-jhe ba-hut dard ho ra-haa hai aur tu-rant da-vaa-ee chaa-hi-ye.',
    hiAcoustic: 'Moo jhay buh hoot durd ho ruh haa hay aur too runt duh vaa ee chaa hee yay.',
    ta: 'எனக்கு கடுமையான வலி உள்ளது, உடனடியாக மருந்து தேவை.',
    taPh: 'E-nak-ku ka-du-mai-yaa-na va-li ul-la-thu, u-da-na-di-yaa-ga ma-run-thu the-vai.',
    taAcoustic: 'Eh nuk koo kuh doo my yaa nuh vuh lee ool luh thoo, oo duh nuh dee yaa guh muh roon thoo thay vy.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NEED', 'MEDICINE'), {
    en: 'I need my medicine, please.',
    enPh: 'Pronunciation: Eye need my med-i-sin, pleez.',
    hi: 'मुझे कृपया मेरी दवाई चाहिए।',
    hiPh: 'Mu-jhe kri-pa-ya me-ree da-vaa-ee chaa-hi-ye.',
    hiAcoustic: 'Moo jhay kri puh yaa may ree duh vaa ee chaa hee yay.',
    ta: 'எனக்கு தயவுசெய்து என் மருந்து வேண்டும்.',
    taPh: 'E-nak-ku tha-ya-vu-sey-thu en ma-run-thu ven-dum.',
    taAcoustic: 'Eh nuk koo thuh yuh voo say thoo en muh roon thoo vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'HOSPITAL'), {
    en: 'Excuse me, where is the nearest hospital?',
    enPh: 'Pronunciation: Eks-kyooz mee, wair iz the neer-est hos-pi-tul?',
    hi: 'माफ़ कीजिए, सबसे पास का अस्पताल कहाँ है?',
    hiPh: 'Maaf kee-ji-ye, sab-se paas kaa as-pa-taal ka-haan hai?',
    hiAcoustic: 'Maaf kee jee yay, sub say paas kaa us puh taal kuh haan hay?',
    ta: 'மன்னிக்கவும், அருகிலுள்ள மருத்துவமனை எங்கே உள்ளது?',
    taPh: 'Man-nik-ka-vum, a-ru-gil-ul-la ma-ruth-thu-va-ma-nai en-ge ul-la-thu?',
    taAcoustic: 'Mun neek kuh voom, uh roo geel ool luh muh rooth thoo vuh muh nye en gay ool luh thoo?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'MEDICINE'), {
    en: 'Excuse me, where can I find a pharmacy or medicine?',
    enPh: 'Pronunciation: Eks-kyooz mee, wair can eye fynd a far-muh-see or med-i-sin?',
    hi: 'माफ़ कीजिए, दवाई या मेडिकल स्टोर कहाँ मिलेगा?',
    hiPh: 'Maaf kee-ji-ye, da-vaa-ee yaa me-di-cal store ka-haan mi-le-ga?',
    hiAcoustic: 'Maaf kee jee yay, duh vaa ee yaa meh dee kul store kuh haan mi lay gaa?',
    ta: 'மன்னிக்கவும், மருந்து கடை எங்கே கிடைக்கும்?',
    taPh: 'Man-nik-ka-vum, ma-run-thu ka-dai en-ge ki-daik-kum?',
    taAcoustic: 'Mun neek kuh voom, muh roon thoo kuh dye en gay kee dye koom?',
    source: 'grammar'
  }],

  [t => (has(t, 'SICK') && has(t, 'DOCTOR')) || (hasAll(t, 'I', 'SICK', 'NEED')), {
    en: 'I am feeling very sick and need to see a doctor.',
    enPh: 'Pronunciation: Eye am fee-ling veh-ree sik and need tu see a dok-ter.',
    hi: 'मेरी तबीयत बहुत खराब है और डॉक्टर को दिखाना है।',
    hiPh: 'Me-ree ta-bee-yat ba-hut kha-raab hai aur doc-tor ko di-khaa-naa hai.',
    hiAcoustic: 'May ree tuh bee yut buh hoot khuh raab hay aur doc tur ko di khaa naa hay.',
    ta: 'எனக்கு உடல்நிலை சரியில்லை, மருத்துவரை பார்க்க வேண்டும்.',
    taPh: 'E-nak-ku u-dal-ni-lai sa-ri-yil-lai, ma-ruth-thu-va-rai paar-kka ven-dum.',
    taAcoustic: 'Eh nuk koo oo dul nee ly suh ree yeel ly, muh rooth thoo vuh rye paar kkuh vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HURT', 'HELP') || hasAll(t, 'I', 'HURT'), {
    en: 'I am hurt and need help urgently!',
    enPh: 'Pronunciation: Eye am hurt and need help ur-jent-lee!',
    hi: 'मुझे चोट लगी है! कृपया मेरी तुरंत मदद करें!',
    hiPh: 'Mu-jhe chot la-gee hai! Kri-pa-ya me-ree tu-rant ma-dad ka-ren!',
    hiAcoustic: 'Moo jhay chot luh gee hay! Kri puh yaa may ree too runt muh dud kuh ren!',
    ta: 'எனக்கு காயம் ஏற்பட்டுள்ளது! தயவுசெய்து உடனே உதவுங்கள்!',
    taPh: 'E-nak-ku kaa-yam er-pat-tul-la-thu! Tha-ya-vu-sey-thu u-da-ne u-tha-vun-gal!',
    taAcoustic: 'Eh nuk koo kaa yum ayr put ool luh thoo! Thuh yuh voo say thoo oo duh nay oo thuh voong gul!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'PAIN') || (has(t, 'PAIN') && t.length === 1), {
    en: 'I am in pain. Please help me.',
    enPh: 'Pronunciation: Eye am in payn. Pleez help mee.',
    hi: 'मुझे दर्द हो रहा है। कृपया सहायता करें।',
    hiPh: 'Mu-jhe dard ho ra-haa hai. Kri-pa-ya sa-haa-ya-taa ka-ren.',
    hiAcoustic: 'Moo jhay durd ho ruh haa hay. Kri puh yaa suh haa yuh taa kuh ren.',
    ta: 'எனக்கு வலி இருக்கிறது. தயவுசெய்து உதவுங்கள்.',
    taPh: 'E-nak-ku va-li iruk-ki-ra-thu. Tha-ya-vu-sey-thu u-tha-vun-gal.',
    taAcoustic: 'Eh nuk koo vuh lee ee rook kee ruh thoo. Thuh yuh voo say thoo oo thuh voong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'SICK') || (has(t, 'SICK') && t.length === 1), {
    en: 'I am not feeling well, I am sick.',
    enPh: 'Pronunciation: Eye am not fee-ling wel, eye am sik.',
    hi: 'मेरी तबीयत ठीक नहीं है, मैं बीमार हूँ।',
    hiPh: 'Me-ree ta-bee-yat theek na-heen hai, main bee-maar hoon.',
    hiAcoustic: 'May ree tuh bee yut theek nuh heen hay, mye bee maar hoon.',
    ta: 'எனக்கு உடல்நிலை சரியில்லை, நான் நோய்வாய்ப்பட்டுள்ளேன்.',
    taPh: 'E-nak-ku u-dal-ni-lai sa-ri-yil-lai, naan noi-vaayp-pat-tul-len.',
    taAcoustic: 'Eh nuk koo oo dul nee ly suh ree yeel ly, naan noy vaayp put ool layn.',
    source: 'grammar'
  }],

  // ────────────────────────────────────────────────────────────────────────────
  // 2. FOOD, DRINK & WATER PATTERNS
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'NEED', 'WATER', 'HELLO', 'PLEASE'), {
    en: 'Hello, I urgently need some water, please.',
    enPh: 'Pronunciation: Heh-loh, eye ur-jent-lee need sum waw-ter, pleez.',
    hi: 'नमस्ते, मुझे कृपया तुरंत थोड़ा पानी चाहिए।',
    hiPh: 'Na-mas-te, mu-jhe kri-pa-ya tu-rant tho-da paa-nee chaa-hi-ye.',
    hiAcoustic: 'Nuh mus tay, moo jhay kri puh yaa too runt tho daa paa nee chaa hee yay.',
    ta: 'வணக்கம், எனக்கு தயவுசெய்து உடனடியாக கொஞ்சம் தண்ணீர் வேண்டும்.',
    taPh: 'Va-nak-kam, e-nak-ku tha-ya-vu-sey-thu u-da-na-di-yaa-ga kon-jam than-neer ven-dum.',
    taAcoustic: 'Vuh nuk kum, eh nuk koo thuh yuh voo say thoo oo duh nuh dee yaa guh kon jum thun neer vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'MORE', 'WATER'), {
    en: 'Could I please have some more water?',
    enPh: 'Pronunciation: Kood eye pleez hav sum mor waw-ter?',
    hi: 'कृपया थोड़ा और पानी दीजिए।',
    hiPh: 'Kri-pa-ya tho-da aur paa-nee dee-ji-ye.',
    hiAcoustic: 'Kri puh yaa tho daa ore paa nee dee jee yay.',
    ta: 'தயவுசெய்து மேலும் கொஞ்சம் தண்ணீர் கொடுங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu me-lum kon-jam than-neer ko-dun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo may loom kon jum thun neer ko doong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HOT', 'WATER'), {
    en: 'I need some warm or hot water, please.',
    enPh: 'Pronunciation: Eye need sum wawrm or hot waw-ter, pleez.',
    hi: 'मुझे कृपया थोड़ा गरम पानी चाहिए।',
    hiPh: 'Mu-jhe kri-pa-ya tho-da ga-ram paa-nee chaa-hi-ye.',
    hiAcoustic: 'Moo jhay kri puh yaa tho daa guh rum paa nee chaa hee yay.',
    ta: 'எனக்கு தயவுசெய்து கொஞ்சம் வெந்நீர் வேண்டும்.',
    taPh: 'E-nak-ku tha-ya-vu-sey-thu kon-jam ven-neer ven-dum.',
    taAcoustic: 'Eh nuk koo thuh yuh voo say thoo kon jum ven neer vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'COLD', 'WATER'), {
    en: 'Could I have some cold water, please?',
    enPh: 'Pronunciation: Kood eye hav sum kohld waw-ter, pleez?',
    hi: 'कृपया थोड़ा ठंडा पानी मिलेगा?',
    hiPh: 'Kri-pa-ya tho-da than-daa paa-nee mi-le-ga?',
    hiAcoustic: 'Kri puh yaa tho daa thun daa paa nee mi lay gaa?',
    ta: 'தயவுசெய்து கொஞ்சம் குளிர்ந்த தண்ணீர் கிடைக்குமா?',
    taPh: 'Tha-ya-vu-sey-thu kon-jam ku-lirn-tha than-neer ki-daik-ku-maa?',
    taAcoustic: 'Thuh yuh voo say thoo kon jum koo leern thuh thun neer kee dye koo maa?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NEED', 'DRINK') || hasAll(t, 'I', 'DRINK'), {
    en: 'I am thirsty and need something to drink, please.',
    enPh: 'Pronunciation: Eye am thurs-tee and need sum-thing tu dringk, pleez.',
    hi: 'मुझे बहुत प्यास लगी है, पीने के लिए कुछ चाहिए।',
    hiPh: 'Mu-jhe ba-hut pyaas la-gee hai, pee-ne ke li-ye kuchh chaa-hi-ye.',
    hiAcoustic: 'Moo jhay buh hoot pyaas luh gee hay, pee nay kay lee yay kooch chaa hee yay.',
    ta: 'எனக்கு தாகமாக இருக்கிறது, குடிக்க ஏதாவது வேண்டும்.',
    taPh: 'E-nak-ku thaa-ga-maa-ga iruk-ki-ra-thu, ku-dik-ka e-thaa-va-thu ven-dum.',
    taAcoustic: 'Eh nuk koo thaa guh maa guh ee rook kee ruh thoo, koo dik kuh ay thaa vuh thoo vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'MORE', 'DRINK'), {
    en: 'Could I have more to drink, please?',
    enPh: 'Pronunciation: Kood eye hav mor tu dringk, pleez?',
    hi: 'पीने के लिए थोड़ा और मिलेगा, कृपया?',
    hiPh: 'Pee-ne ke li-ye tho-da aur mi-le-ga, kri-pa-ya?',
    hiAcoustic: 'Pee nay kay lee yay tho daa ore mi lay gaa, kri puh yaa?',
    ta: 'குடிக்க மேலும் கொஞ்சம் கிடைக்குமா, தயவுசெய்து?',
    taPh: 'Ku-dik-ka me-lum kon-jam ki-daik-ku-maa, tha-ya-vu-sey-thu?',
    taAcoustic: 'Koo dik kuh may loom kon jum kee dye koo maa, thuh yuh voo say thoo?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NEED', 'WATER'), {
    en: 'I need water, please.',
    enPh: 'Pronunciation: Eye need waw-ter, pleez.',
    hi: 'मुझे पानी चाहिए, कृपया।',
    hiPh: 'Mu-jhe paa-nee chaa-hi-ye, kri-pa-ya.',
    hiAcoustic: 'Moo jhay paa nee chaa hee yay, kri puh yaa.',
    ta: 'எனக்கு தண்ணீர் வேண்டும், தயவுசெய்து.',
    taPh: 'E-nak-ku than-neer ven-dum, tha-ya-vu-sey-thu.',
    taAcoustic: 'Eh nuk koo thun neer vayn doom, thuh yuh voo say thoo.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NEED', 'FOOD', 'HELLO'), {
    en: 'Hello, I am hungry and need food, please.',
    enPh: 'Pronunciation: Heh-loh, eye am hung-gree and need food, pleez.',
    hi: 'नमस्ते, मुझे भूख लगी है और खाना चाहिए।',
    hiPh: 'Na-mas-te, mu-jhe bhookh la-gee hai aur khaa-naa chaa-hi-ye.',
    hiAcoustic: 'Nuh mus tay, moo jhay bhookh luh gee hay aur khaa naa chaa hee yay.',
    ta: 'வணக்கம், எனக்கு பசிக்கிறது, உணவு வேண்டும்.',
    taPh: 'Va-nak-kam, e-nak-ku pa-sik-ki-ra-thu, u-na-vu ven-dum.',
    taAcoustic: 'Vuh nuk kum, eh nuk koo puh sik kee ruh thoo, oo nuh voo vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HUNGRY', 'FOOD') || hasAll(t, 'I', 'HUNGRY'), {
    en: 'I am hungry. Can I please have something to eat?',
    enPh: 'Pronunciation: Eye am hung-gree. Can eye pleez hav sum-thing tu eet?',
    hi: 'मुझे बहुत भूख लगी है। क्या खाने के लिए कुछ मिल सकता है?',
    hiPh: 'Mu-jhe ba-hut bhookh la-gee hai. Kyaa khaa-ne ke li-ye kuchh mil sak-taa hai?',
    hiAcoustic: 'Moo jhay buh hoot bhookh luh gee hay. Kyaa khaa nay kay lee yay kooch mil suk taa hay?',
    ta: 'எனக்கு பசிக்கிறது. சாப்பிட ஏதாவது கிடைக்குமா?',
    taPh: 'E-nak-ku pa-sik-ki-ra-thu. Saap-pi-da e-thaa-va-thu ki-daik-ku-maa?',
    taAcoustic: 'Eh nuk koo puh sik kee ruh thoo. Saap pee duh ay thaa vuh thoo kee dye koo maa?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'MORE', 'FOOD'), {
    en: 'Could I please have some more food?',
    enPh: 'Pronunciation: Kood eye pleez hav sum mor food?',
    hi: 'कृपया थोड़ा और खाना मिल सकता है?',
    hiPh: 'Kri-pa-ya tho-da aur khaa-naa mil sak-taa hai?',
    hiAcoustic: 'Kri puh yaa tho daa ore khaa naa mil suk taa hay?',
    ta: 'தயவுசெய்து மேலும் கொஞ்சம் உணவு கிடைக்குமா?',
    taPh: 'Tha-ya-vu-sey-thu me-lum kon-jam u-na-vu ki-daik-ku-maa?',
    taAcoustic: 'Thuh yuh voo say thoo may loom kon jum oo nuh voo kee dye koo maa?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NEED', 'FOOD'), {
    en: 'I need food, please.',
    enPh: 'Pronunciation: Eye need food, pleez.',
    hi: 'मुझे खाना चाहिए, कृपया।',
    hiPh: 'Mu-jhe khaa-naa chaa-hi-ye, kri-pa-ya.',
    hiAcoustic: 'Moo jhay khaa naa chaa hee yay, kri puh yaa.',
    ta: 'எனக்கு உணவு வேண்டும், தயவுசெய்து.',
    taPh: 'E-nak-ku u-na-vu ven-dum, tha-ya-vu-sey-thu.',
    taAcoustic: 'Eh nuk koo oo nuh voo vayn doom, thuh yuh voo say thoo.',
    source: 'grammar'
  }],

  // ────────────────────────────────────────────────────────────────────────────
  // 3. LOCATIONS & NAVIGATION
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'WHERE', 'BATHROOM'), {
    en: 'Excuse me, where is the restroom?',
    enPh: 'Pronunciation: Eks-kyooz mee, wair iz the rest-room?',
    hi: 'माफ़ कीजिए, शौचालय कहाँ है?',
    hiPh: 'Maaf kee-ji-ye, shau-chaa-lay ka-haan hai?',
    hiAcoustic: 'Maaf kee jee yay, show chaa luy kuh haan hay?',
    ta: 'மன்னிக்கவும், கழிப்பறை எங்கே உள்ளது?',
    taPh: 'Man-nik-ka-vum, ka-zhip-pa-rai en-ge ul-la-thu?',
    taAcoustic: 'Mun neek kuh voom, kuh zheep puh rye en gay ool luh thoo?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'WATER'), {
    en: 'Excuse me, where can I get drinking water?',
    enPh: 'Pronunciation: Eks-kyooz mee, wair can eye get dringk-ing waw-ter?',
    hi: 'माफ़ कीजिए, पीने का पानी कहाँ मिलेगा?',
    hiPh: 'Maaf kee-ji-ye, pee-ne kaa paa-nee ka-haan mi-le-ga?',
    hiAcoustic: 'Maaf kee jee yay, pee nay kaa paa nee kuh haan mi lay gaa?',
    ta: 'மன்னிக்கவும், குடிநீர் எங்கே கிடைக்கும்?',
    taPh: 'Man-nik-ka-vum, ku-di-neer en-ge ki-daik-kum?',
    taAcoustic: 'Mun neek kuh voom, koo dee neer en gay kee dye koom?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'FOOD'), {
    en: 'Excuse me, where can I get something to eat?',
    enPh: 'Pronunciation: Eks-kyooz mee, wair can eye get sum-thing tu eet?',
    hi: 'माफ़ कीजिए, खाने के लिए कुछ कहाँ मिलेगा?',
    hiPh: 'Maaf kee-ji-ye, khaa-ne ke li-ye kuchh ka-haan mi-le-ga?',
    hiAcoustic: 'Maaf kee jee yay, khaa nay kay lee yay kooch kuh haan mi lay gaa?',
    ta: 'மன்னிக்கவும், சாப்பிட எங்கே கிடைக்கும்?',
    taPh: 'Man-nik-ka-vum, saap-pi-da en-ge ki-daik-kum?',
    taAcoustic: 'Mun neek kuh voom, saap pee duh en gay kee dye koom?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'DOCTOR'), {
    en: 'Where is the doctor or medical clinic?',
    enPh: 'Pronunciation: Wair iz the dok-ter or med-i-kul klin-ik?',
    hi: 'डॉक्टर या चिकित्सा क्लिनिक कहाँ है?',
    hiPh: 'Doc-tor yaa chi-kit-saa cli-nic ka-haan hai?',
    hiAcoustic: 'Doc tur yaa chi kit saa cli nic kuh haan hay?',
    ta: 'மருத்துவர் அல்லது மருத்துவமனை எங்கே உள்ளது?',
    taPh: 'Ma-ruth-thu-var al-la-thu ma-ruth-thu-va-ma-nai en-ge ul-la-thu?',
    taAcoustic: 'Muh rooth thoo vur ul luh thoo muh rooth thoo vuh muh nye en gay ool luh thoo?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'HOME'), {
    en: 'Could you please help me find my way home?',
    enPh: 'Pronunciation: Kood yoo pleez help mee fynd my way hohm?',
    hi: 'क्या आप मुझे घर पहुँचने का रास्ता बता सकते हैं?',
    hiPh: 'Kyaa aap mu-jhe ghar pahunch-ne kaa raas-taa ba-taa sak-te hain?',
    hiAcoustic: 'Kyaa aap moo jhay ghur puh hoonch nay kaa raas taa buh taa suk tay hain?',
    ta: 'தயவுசெய்து நான் வீட்டிற்கு செல்ல உதவ முடியுமா?',
    taPh: 'Tha-ya-vu-sey-thu naan veet-tir-ku sel-la u-tha-va mu-di-yu-maa?',
    taAcoustic: 'Thuh yuh voo say thoo naan veet teer koo chel luh oo thuh vuh moo dee yoo maa?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'POLICE'), {
    en: 'Where is the nearest police station?',
    enPh: 'Pronunciation: Wair iz the neer-est po-lees stay-shun?',
    hi: 'नज़दीकी पुलिस स्टेशन कहाँ है?',
    hiPh: 'Naz-dee-kee pu-lis sta-tion ka-haan hai?',
    hiAcoustic: 'Nuz dee kee poo lis stay shun kuh haan hay?',
    ta: 'அருகிலுள்ள காவல் நிலையம் எங்கே உள்ளது?',
    taPh: 'A-ru-gil-ul-la kaa-val ni-lai-yam en-ge ul-la-thu?',
    taAcoustic: 'Uh roo geel ool luh kaa vul nee ly yum en gay ool luh thoo?',
    source: 'grammar'
  }],

  // ────────────────────────────────────────────────────────────────────────────
  // 4. FEELINGS & PERSONAL STATES
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'I', 'TIRED', 'SLEEP') || hasAll(t, 'TIRED', 'SLEEP'), {
    en: 'I am exhausted and urgently need to rest and sleep.',
    enPh: 'Pronunciation: Eye am eg-zaws-ted and ur-jent-lee need tu rest and sleep.',
    hi: 'मैं बहुत थक गया हूँ और मुझे सोने की सख्त ज़रूरत है।',
    hiPh: 'Main ba-hut thak ga-yaa hoon aur mu-jhe so-ne kee sakht za-roo-rat hai.',
    hiAcoustic: 'Mye buh hoot thuk guh yaa hoon aur moo jhay so nay kee sukht zuh roo rut hay.',
    ta: 'நான் மிகவும் சோர்வாக இருக்கிறேன், உடனே தூங்க வேண்டும்.',
    taPh: 'Naan mi-ga-vum sor-vaa-ga iruk-ki-ren, u-da-ne thoon-ga ven-dum.',
    taAcoustic: 'Naan mee guh voom sore vaa guh ee rook kee ren, oo duh nay thoon guh vayn doom.',
    source: 'grammar'
  }],

  [t => has(t, 'TIRED') && has(t, 'HOME'), {
    en: 'I am very tired and want to go home, please.',
    enPh: 'Pronunciation: Eye am veh-ree tyrd and wont tu goh hohm, pleez.',
    hi: 'मैं बहुत थक गया हूँ और घर जाना चाहता हूँ।',
    hiPh: 'Main ba-hut thak ga-yaa hoon aur ghar jaa-naa chaah-taa hoon.',
    hiAcoustic: 'Mye buh hoot thuk guh yaa hoon aur ghur jaa naa chaah taa hoon.',
    ta: 'நான் மிகவும் சோர்வாக இருக்கிறேன், வீட்டிற்கு செல்ல வேண்டும்.',
    taPh: 'Naan mi-ga-vum sor-vaa-ga iruk-ki-ren, veet-tir-ku sel-la ven-dum.',
    taAcoustic: 'Naan mee guh voom sore vaa guh ee rook kee ren, veet teer koo chel luh vayn doom.',
    source: 'grammar'
  }],

  [t => (hasAll(t, 'I', 'TIRED') && !hasAny(t, 'HOME', 'SLEEP', 'REST', 'WORK')) || (has(t, 'TIRED') && t.length === 1), {
    en: 'I am feeling very tired.',
    enPh: 'Pronunciation: Eye am fee-ling veh-ree tyrd.',
    hi: 'मैं बहुत थका हुआ महसूस कर रहा हूँ।',
    hiPh: 'Main ba-hut tha-kaa hu-aa mah-soos kar ra-haa hoon.',
    hiAcoustic: 'Mye buh hoot thuh kaa hoo aa muh soos kur ruh haa hoon.',
    ta: 'நான் மிகவும் சோர்வாக உணர்கிறேன்.',
    taPh: 'Naan mi-ga-vum sor-vaa-ga u-nar-gi-ren.',
    taAcoustic: 'Naan mee guh voom sore vaa guh oo nur gee ren.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'SLEEP') || (has(t, 'SLEEP') && t.length === 1), {
    en: 'I am sleepy and need to sleep.',
    enPh: 'Pronunciation: Eye am slee-pee and need tu sleep.',
    hi: 'मुझे नींद आ रही है, मैं सोना चाहता हूँ।',
    hiPh: 'Mu-jhe neend aa ra-hee hai, main so-naa chaah-taa hoon.',
    hiAcoustic: 'Moo jhay neend aa ruh hee hay, mye so naa chaah taa hoon.',
    ta: 'எனக்கு தூக்கம் வருகிறது, நான் தூங்க வேண்டும்.',
    taPh: 'E-nak-ku thook-kam va-ru-gi-ra-thu, naan thoon-ga ven-dum.',
    taAcoustic: 'Eh nuk koo thook kum vuh roo gee ruh thoo, naan thoon guh vayn doom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'HAPPY') || (has(t, 'HAPPY') && t.length === 1), {
    en: 'I am feeling very happy, thank you!',
    enPh: 'Pronunciation: Eye am fee-ling veh-ree hap-pee, thangk yoo!',
    hi: 'मैं बहुत खुश हूँ, धन्यवाद!',
    hiPh: 'Main ba-hut khush hoon, dhan-ya-vaad!',
    hiAcoustic: 'Mye buh hoot koosh hoon, dhun yuh vaad!',
    ta: 'நான் மிகவும் மகிழ்ச்சியாக இருக்கிறேன், நன்றி!',
    taPh: 'Naan mi-ga-vum ma-gizh-chi-yaa-ga iruk-ki-ren, nan-dri!',
    taAcoustic: 'Naan mee guh voom muh geezh chee yaa guh ee rook kee ren, nun dree!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'SAD') || (has(t, 'SAD') && t.length === 1), {
    en: 'I am feeling sad and distressed.',
    enPh: 'Pronunciation: Eye am fee-ling sad and dis-trest.',
    hi: 'मैं बहुत दुखी महसूस कर रहा हूँ।',
    hiPh: 'Main ba-hut du-khee mah-soos kar ra-haa hoon.',
    hiAcoustic: 'Mye buh hoot doo khee muh soos kur ruh haa hoon.',
    ta: 'நான் சோகமாக உணர்கிறேன்.',
    taPh: 'Naan so-ga-maa-ga u-nar-gi-ren.',
    taAcoustic: 'Naan so guh maa guh oo nur gee ren.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'GOOD'), {
    en: 'I am doing well and feeling good.',
    enPh: 'Pronunciation: Eye am doo-ing wel and fee-ling good.',
    hi: 'मैं बिल्कुल ठीक और अच्छा महसूस कर रहा हूँ।',
    hiPh: 'Main bil-kul theek aur ach-chaa mah-soos kar ra-haa hoon.',
    hiAcoustic: 'Mye bil kool theek aur uch chaa muh soos kur ruh haa hoon.',
    ta: 'நான் நன்றாக உணர்கிறேன்.',
    taPh: 'Naan nan-raa-ga u-nar-gi-ren.',
    taAcoustic: 'Naan nun raa guh oo nur gee ren.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'BAD'), {
    en: 'I am not doing well at all.',
    enPh: 'Pronunciation: Eye am not doo-ing wel at awl.',
    hi: 'मेरी स्थिति बिल्कुल अच्छी नहीं है।',
    hiPh: 'Me-ree sthi-ti bil-kul ach-chhee na-heen hai.',
    hiAcoustic: 'May ree sthi tee bil kool uch chee nuh heen hay.',
    ta: 'நான் நன்றாக உணரவில்லை.',
    taPh: 'Naan nan-raa-ga u-na-ra-vil-lai.',
    taAcoustic: 'Naan nun raa guh oo nuh ruh veel ly.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'OK'), {
    en: 'I am doing alright, thank you.',
    enPh: 'Pronunciation: Eye am doo-ing awl-ryt, thangk yoo.',
    hi: 'मैं ठीक-ठाक हूँ, धन्यवाद।',
    hiPh: 'Main theek-thaak hoon, dhan-ya-vaad.',
    hiAcoustic: 'Mye theek thaak hoon, dhun yuh vaad.',
    ta: 'நான் நலமாக இருக்கிறேன், நன்றி.',
    taPh: 'Naan na-la-maa-ga iruk-ki-ren, nan-dri.',
    taAcoustic: 'Naan nuh luh maa guh ee rook kee ren, nun dree.',
    source: 'grammar'
  }],

  // ────────────────────────────────────────────────────────────────────────────
  // 5. FAMILY & SOCIAL RELATIONS
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'WHERE', 'FAMILY') || hasAll(t, 'NEED', 'FAMILY'), {
    en: 'Could you please help me contact my family?',
    enPh: 'Pronunciation: Kood yoo pleez help mee kon-takt my fam-i-lee?',
    hi: 'कृपया मेरे परिवार से संपर्क करने में मेरी सहायता करें।',
    hiPh: 'Kri-pa-ya me-re pa-ri-vaar se sam-park kar-ne mein me-ree sa-haa-ya-taa ka-ren.',
    hiAcoustic: 'Kri puh yaa may ray puh ree vaar say sum purk kur nay mayn may ree suh haa yuh taa kuh ren.',
    ta: 'தயவுசெய்து என் குடும்பத்தினரை தொடர்பு கொள்ள உதவுங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu en ku-dum-path-thi-na-rai thod-ar-pu kol-la u-tha-vun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo en koo doom puth thee nuh rye thod ur poo kol luh oo thuh voong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'MOTHER') || hasAll(t, 'NEED', 'MOTHER'), {
    en: 'Could you please help me find my mother?',
    enPh: 'Pronunciation: Kood yoo pleez help mee fynd my muth-er?',
    hi: 'कृपया मेरी माँ को ढूँढने में मेरी मदद करें।',
    hiPh: 'Kri-pa-ya me-ree maa ko dhoondh-ne mein me-ree ma-dad ka-ren.',
    hiAcoustic: 'Kri puh yaa may ree maa ko dhoondh nay mayn may ree muh dud kuh ren.',
    ta: 'தயவுசெய்து என் அம்மாவை கண்டுபிடிக்க உதவுங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu en am-maa-vai kan-du-pi-dik-ka u-tha-vun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo en um maa vye kun doo pee dik kuh oo thuh voong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'FATHER') || hasAll(t, 'NEED', 'FATHER'), {
    en: 'Could you please help me find my father?',
    enPh: 'Pronunciation: Kood yoo pleez help mee fynd my fah-ther?',
    hi: 'कृपया मेरे पिताजी को ढूँढने में मेरी मदद करें।',
    hiPh: 'Kri-pa-ya me-re pi-taa-jee ko dhoondh-ne mein me-ree ma-dad ka-ren.',
    hiAcoustic: 'Kri puh yaa may ray pee taa jee ko dhoondh nay mayn may ree muh dud kuh ren.',
    ta: 'தயவுசெய்து என் அப்பாவை கண்டுபிடிக்க உதவுங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu en ap-paa-vai kan-du-pi-dik-ka u-tha-vun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo en up paa vye kun doo pee dik kuh oo thuh voong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WHERE', 'FRIEND') || hasAll(t, 'NEED', 'FRIEND'), {
    en: 'Could you please help me reach my friend?',
    enPh: 'Pronunciation: Kood yoo pleez help mee reech my frend?',
    hi: 'कृपया मेरे दोस्त से बात कराने में मेरी मदद करें।',
    hiPh: 'Kri-pa-ya me-re dost se baat ka-raa-ne mein me-ree ma-dad ka-ren.',
    hiAcoustic: 'Kri puh yaa may ray dost say baat kuh raa nay mayn may ree muh dud kuh ren.',
    ta: 'தயவுசெய்து என் நண்பரை தொடர்பு கொள்ள உதவுங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu en nan-ba-rai thod-ar-pu kol-la u-tha-vun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo en nun buh rye thod ur poo kol luh oo thuh voong gul.',
    source: 'grammar'
  }],

  // ────────────────────────────────────────────────────────────────────────────
  // 6. DAILY COMMUNICATION & PRACTICAL REQUESTS
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'NEED', 'MONEY'), {
    en: 'I urgently need some financial assistance or money.',
    enPh: 'Pronunciation: Eye ur-jent-lee need sum fy-nan-shul as-sis-tuns or mun-ee.',
    hi: 'मुझे पैसों की बहुत सख्त ज़रूरत है।',
    hiPh: 'Mu-jhe pai-son kee ba-hut sakht za-roo-rat hai.',
    hiAcoustic: 'Moo jhay py son kee buh hoot sukht zuh roo rut hay.',
    ta: 'எனக்கு அவசரமாக பண உதவி தேவை.',
    taPh: 'E-nak-ku a-va-sa-ra-maa-ga pa-na u-tha-vi the-vai.',
    taAcoustic: 'Eh nuk koo uh vuh suh ruh maa guh puh nuh oo thuh vee thay vy.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NEED', 'CALL') || hasAll(t, 'NEED', 'PHONE'), {
    en: 'I need to make an urgent phone call, please.',
    enPh: 'Pronunciation: Eye need tu mayk an ur-jent fohn kawl, pleez.',
    hi: 'मुझे एक ज़रूरी फ़ोन कॉल करना है, कृपया।',
    hiPh: 'Mu-jhe ek za-roo-ree phone call kar-naa hai, kri-pa-ya.',
    hiAcoustic: 'Moo jhay ek zuh roo ree phone call kur naa hay, kri puh yaa.',
    ta: 'நான் அவசரமாக ஒரு தொலைபேசி அழைப்பு செய்ய வேண்டும்.',
    taPh: 'Naan a-va-sa-ra-maa-ga o-ru tho-lai-pe-si a-zhaip-pu sey-ya ven-dum.',
    taAcoustic: 'Naan uh vuh suh ruh maa guh oh roo tho ly pay see uh zhyp poo say yuh vayn doom.',
    source: 'grammar'
  }],

  [t => has(t, 'UNDERSTAND') && (has(t, 'NO') || has(t, 'NOT')), {
    en: 'I do not understand. Could you please explain again?',
    enPh: 'Pronunciation: Eye doo not un-der-stand. Kood yoo pleez eks-playn a-gen?',
    hi: 'मुझे समझ नहीं आया। क्या आप कृपया दोबारा समझा सकते हैं?',
    hiPh: 'Mu-jhe sa-majh na-heen aa-yaa. Kyaa aap kri-pa-ya do-baa-raa sam-jhaa sak-te hain?',
    hiAcoustic: 'Moo jhay suh mujh nuh heen aa yaa. Kyaa aap kri puh yaa doh baa raa sum jhaa suk tay hain?',
    ta: 'எனக்கு புரியவில்லை. தயவுசெய்து மீண்டும் விளக்க முடியுமா?',
    taPh: 'E-nak-ku pu-ri-ya-vil-lai. Tha-ya-vu-sey-thu meen-dum vi-lak-ka mu-di-yu-maa?',
    taAcoustic: 'Eh nuk koo poo ree yuh veel ly. Thuh yuh voo say thoo meen doom vee luk kuh moo dee yoo maa?',
    source: 'grammar'
  }],

  [t => has(t, 'UNDERSTAND') && t.length === 1, {
    en: 'Yes, I understand clearly.',
    enPh: 'Pronunciation: Yes, eye un-der-stand kleer-lee.',
    hi: 'हाँ, मैं अच्छी तरह समझ गया/गई।',
    hiPh: 'Haan, main ach-chhee ta-rah sa-majh ga-yaa/ga-yee.',
    hiAcoustic: 'Haan, mye uch chee tuh ruh suh mujh guh yaa.',
    ta: 'ஆம், எனக்கு தெளிவாக புரிகிறது.',
    taPh: 'Aam, e-nak-ku the-li-vaa-ga pu-ri-gi-ra-thu.',
    taAcoustic: 'Aam, eh nuk koo thay lee vaa guh poo ree gee ruh thoo.',
    source: 'grammar'
  }],

  [t => has(t, 'REPEAT'), {
    en: 'Could you please repeat that once more?',
    enPh: 'Pronunciation: Kood yoo pleez ree-peet that wuns mor?',
    hi: 'कृपया एक बार फिर से दोहराइए।',
    hiPh: 'Kri-pa-ya ek baar phir se doh-raa-i-ye.',
    hiAcoustic: 'Kri puh yaa ek baar fur say doh raa ee yay.',
    ta: 'தயவுசெய்து மீண்டும் ஒருமுறை சொல்லுங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu meen-dum o-ru-mu-rai sol-lun-gal.',
    taAcoustic: 'Thuh yuh voo say thoo meen doom oh roo moo rye sol loong gul.',
    source: 'grammar'
  }],

  [t => has(t, 'TIME'), {
    en: 'Excuse me, what time is it now?',
    enPh: 'Pronunciation: Eks-kyooz mee, wut tym iz it now?',
    hi: 'माफ़ कीजिए, अभी क्या समय हुआ है?',
    hiPh: 'Maaf kee-ji-ye, abhee kyaa sa-may hu-aa hai?',
    hiAcoustic: 'Maaf kee jee yay, ub hee kyaa suh may hoo aa hay?',
    ta: 'மன்னிக்கவும், இப்போது நேரம் என்ன?',
    taPh: 'Man-nik-ka-vum, ip-po-thu ne-ram en-na?',
    taAcoustic: 'Mun neek kuh voom, eep po thoo nay rum en nuh?',
    source: 'grammar'
  }],

  [t => has(t, 'FINISH'), {
    en: 'I am completely finished, thank you.',
    enPh: 'Pronunciation: Eye am kum-pleet-lee fin-isht, thangk yoo.',
    hi: 'मेरा काम पूरा हो गया है, धन्यवाद।',
    hiPh: 'Me-raa kaam poo-raa ho ga-yaa hai, dhan-ya-vaad.',
    hiAcoustic: 'May raa kaam poo raa ho guh yaa hay, dhun yuh vaad.',
    ta: 'நான் வேலையை முடித்துவிட்டேன், நன்றி.',
    taPh: 'Naan ve-lai-yai mu-dith-thu-vit-ten, nan-dri.',
    taAcoustic: 'Naan vay ly yye moo deeth thoo veet tayn, nun dree.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'WAIT', 'PLEASE'), {
    en: 'Please wait here for a moment.',
    enPh: 'Pronunciation: Pleez wait heer for a mo-ment.',
    hi: 'कृपया यहाँ एक पल के लिए रुकिए।',
    hiPh: 'Kri-pa-ya ya-haan ek pal ke li-ye ru-ki-ye.',
    hiAcoustic: 'Kri puh yaa yuh haan ek pul kay lee yay roo kee yay.',
    ta: 'தயவுசெய்து இங்கே ஒரு நிமிடம் காத்திருங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu in-ge o-ru ni-mi-dam kaath-thi-run-gal.',
    taAcoustic: 'Thuh yuh voo say thoo een gay oh roo nee mee dum kaath ee roong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'WAIT'), {
    en: 'I will wait right here.',
    enPh: 'Pronunciation: Eye wil wait ryt heer.',
    hi: 'मैं यहीं पर इंतज़ार करूँगा/करूँगी।',
    hiPh: 'Main ya-heen par in-ta-zaar ka-roon-gaa/ka-roon-gee.',
    hiAcoustic: 'Mye yuh heen pur een tuh zaar kuh roon gaa.',
    ta: 'நான் இங்கேயே காத்திருப்பேன்.',
    taPh: 'Naan in-ge-ye kaath-thi-rup-pen.',
    taAcoustic: 'Naan een gay yay kaath thee roop payn.',
    source: 'grammar'
  }],

  // ────────────────────────────────────────────────────────────────────────────
  // 7. GREETINGS & SOCIAL COURTESIES
  // ────────────────────────────────────────────────────────────────────────────
  [t => hasAll(t, 'HELLO', 'MORNING'), {
    en: 'Good morning! Wishing you a wonderful day.',
    enPh: 'Pronunciation: Good mor-ning! Wish-ing yoo a wun-der-ful day.',
    hi: 'शुभ प्रभात! आपका दिन मंगलमय हो।',
    hiPh: 'Shubh pra-bhaat! Aap-kaa din man-gal-may ho.',
    hiAcoustic: 'Shoobh pruh bhaat! Aap kaa din mun gul may ho.',
    ta: 'காலை வணக்கம்! இனிய நாளாக அமையட்டும்.',
    taPh: 'Kaa-lai va-nak-kam! I-ni-ya naa-laa-ga a-mai-yat-tum.',
    taAcoustic: 'Kaa lye vuh nuk kum! Ee nee yuh naa laa guh uh my yut toom.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HELLO', 'NIGHT'), {
    en: 'Good night! Sleep well and sweet dreams.',
    enPh: 'Pronunciation: Good nyt! Sleep wel and sweet dreemz.',
    hi: 'शुभ रात्रि! अच्छे से सोइए।',
    hiPh: 'Shubh raa-tri! Ach-chhe se so-i-ye.',
    hiAcoustic: 'Shoobh raa tree! Uch chhay say so ee yay.',
    ta: 'இனிய இரவு வணக்கம்! நன்றாக உறங்குங்கள்.',
    taPh: 'I-ni-ya i-ra-vu va-nak-kam! Nan-raa-ga u-ran-gun-gal.',
    taAcoustic: 'Ee nee yuh ee ruh voo vuh nuk kum! Nun raa guh oo rung goong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'HELLO', 'I', 'YOU'), {
    en: 'Hello! I am very pleased to meet you.',
    enPh: 'Pronunciation: Heh-loh! Eye am veh-ree pleezd tu meet yoo.',
    hi: 'नमस्ते! आपसे मिलकर मुझे बहुत खुशी हुई।',
    hiPh: 'Na-mas-te! Aap-se mil-kar mu-jhe ba-hut khu-shee hu-ee.',
    hiAcoustic: 'Nuh mus tay! Aap say mil kur moo jhay buh hoot khoo shee hoo ee.',
    ta: 'வணக்கம்! உங்களை சந்தித்ததில் எனக்கு மிக்க மகிழ்ச்சி.',
    taPh: 'Va-nak-kam! Un-ga-lai san-thith-tha-thil e-nak-ku mik-ka ma-gizh-chi.',
    taAcoustic: 'Vuh nuk kum! Oon guh ly sun theeth thuh theel eh nuk koo meek kuh muh geezh chee.',
    source: 'grammar'
  }],

  [t => has(t, 'HELLO') && t.every(x => ['HELLO', 'PLEASE', 'THANK_YOU'].includes(x)), {
    en: 'Hello! How are you doing today?',
    enPh: 'Pronunciation: Heh-loh! How are yoo doo-ing tu-day?',
    hi: 'नमस्ते! आज आप कैसे हैं?',
    hiPh: 'Na-mas-te! Aaj aap kai-se hain?',
    hiAcoustic: 'Nuh mus tay! Aaj aap kay say hain?',
    ta: 'வணக்கம்! இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?',
    taPh: 'Va-nak-kam! In-ru neen-gal ep-pa-di i-ruk-ki-reer-gal?',
    taAcoustic: 'Vuh nuk kum! Een roo neen gul ep puh dee ee rook kee reer gul?',
    source: 'grammar'
  }],

  [t => hasAll(t, 'THANK_YOU', 'HELP'), {
    en: 'Thank you so much for your kind assistance!',
    enPh: 'Pronunciation: Thangk yoo soh much for yor kynd as-sis-tuns!',
    hi: 'आपकी इस सहायता के लिए बहुत-बहुत धन्यवाद!',
    hiPh: 'Aap-kee is sa-haa-ya-taa ke li-ye ba-hut dhan-ya-vaad!',
    hiAcoustic: 'Aap kee ees suh haa yuh taa kay lee yay buh hoot dhun yuh vaad!',
    ta: 'உங்கள் அன்பான உதவிக்கு மிக்க நன்றி!',
    taPh: 'Un-gal an-baa-na u-tha-vik-ku mik-ka nan-dri!',
    taAcoustic: 'Oon gul un baa nuh oo thuh veek koo meek kuh nun dree!',
    source: 'grammar'
  }],

  [t => hasAll(t, 'THANK_YOU', 'DOCTOR'), {
    en: 'Thank you very much, Doctor, for your care.',
    enPh: 'Pronunciation: Thangk yoo veh-ree much, dok-ter, for yor kair.',
    hi: 'डॉक्टर साहब, आपकी देखभाल के लिए बहुत धन्यवाद।',
    hiPh: 'Doc-tor saa-hab, aap-kee dekh-bhaal ke li-ye ba-hut dhan-ya-vaad.',
    hiAcoustic: 'Doc tur saa hub, aap kee daykh bhaal kay lee yay buh hoot dhun yuh vaad.',
    ta: 'மிக்க நன்றி மருத்துவரே, உங்கள் கவனிப்புக்கு.',
    taPh: 'Mik-ka nan-dri ma-ruth-thu-va-re, un-gal ka-va-nip-puk-ku.',
    taAcoustic: 'Meek kuh nun dree muh rooth thoo vuh ray, oon gul kuh vuh neep pook koo.',
    source: 'grammar'
  }],

  [t => has(t, 'THANK_YOU') && !hasAny(t, 'HELP', 'DOCTOR', 'WATER', 'FOOD', 'PAIN'), {
    en: 'Thank you very much.',
    enPh: 'Pronunciation: Thangk yoo veh-ree much.',
    hi: 'आपका बहुत-बहुत धन्यवाद।',
    hiPh: 'Aap-kaa ba-hut ba-hut dhan-ya-vaad.',
    hiAcoustic: 'Aap kaa buh hoot buh hoot dhun yuh vaad.',
    ta: 'மிக்க நன்றி.',
    taPh: 'Mik-ka nan-dri.',
    taAcoustic: 'Meek kuh nun dree.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'SORRY', 'WAIT'), {
    en: 'I am very sorry for keeping you waiting.',
    enPh: 'Pronunciation: Eye am veh-ree sor-ree for keep-ing yoo wait-ing.',
    hi: 'आपको इंतज़ार कराने के लिए मुझे बहुत खेद है।',
    hiPh: 'Aap-ko in-ta-zaar ka-raa-ne ke li-ye mu-jhe ba-hut khed hai.',
    hiAcoustic: 'Aap ko een tuh zaar kuh raa nay kay lee yay moo jhay buh hoot khayd hay.',
    ta: 'உங்களை காத்திருக்க வைத்ததற்கு மன்னிக்கவும்.',
    taPh: 'Un-ga-lai kaath-thi-ruk-ka vaith-tha-thar-ku man-nik-ka-vum.',
    taAcoustic: 'Oon guh ly kaath thee rook kuh vyth thuh thur koo mun neek kuh voom.',
    source: 'grammar'
  }],

  [t => has(t, 'SORRY') && t.length === 1, {
    en: 'I am sincerely sorry, please excuse me.',
    enPh: 'Pronunciation: Eye am sin-seer-lee sor-ree, pleez eks-kyooz mee.',
    hi: 'मुझे बहुत खेद है, कृपया मुझे माफ़ करें।',
    hiPh: 'Mu-jhe ba-hut khed hai, kri-pa-ya mu-jhe maaf ka-ren.',
    hiAcoustic: 'Moo jhay buh hoot khayd hay, kri puh yaa moo jhay maaf kuh ren.',
    ta: 'நான் மனதார மன்னிப்பு கேட்டுக்கொள்கிறேன்.',
    taPh: 'Naan ma-na-thaa-ra man-nip-pu ket-tuk-kol-gi-ren.',
    taAcoustic: 'Naan muh nuh thaa ruh mun neep poo kayt took kol gee ren.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'YES', 'PLEASE'), {
    en: 'Yes, please, I would really appreciate that.',
    enPh: 'Pronunciation: Yes, pleez, eye wood ree-lee ap-pree-shee-ayt that.',
    hi: 'हाँ, कृपया, बहुत मेहरबानी होगी।',
    hiPh: 'Haan, kri-pa-ya, ba-hut me-har-baa-nee ho-gee.',
    hiAcoustic: 'Haan, kri puh yaa, buh hoot may hur baa nee ho gee.',
    ta: 'ஆம், தயவுசெய்து, மிகவும் பயனுள்ளதாக இருக்கும்.',
    taPh: 'Aam, tha-ya-vu-sey-thu, mi-ga-vum pa-yan-ul-la-thaa-ga iruk-kum.',
    taAcoustic: 'Aam, thuh yuh voo say thoo, mee guh voom puh yun ool luh thaa guh ee rook koom.',
    source: 'grammar'
  }],

  [t => has(t, 'NAMASTE') && t.length === 1, {
    en: 'Namaste! I offer you my warm greetings and deepest respect.',
    enPh: 'Pronunciation: Nuh-mus-tay! Eye of-fer yoo my wawrm gree-tings and ree-spekt.',
    hi: 'नमस्ते! मैं आपको प्रणाम और सादर नमस्कार करता हूँ।',
    hiPh: 'Na-mas-te! Main aap-ko pra-naam aur saa-dar na-mas-kaar kar-taa hoon.',
    hiAcoustic: 'Nuh mus tay! Mye aap ko pruh naam aur saa dur nuh mus kaar kur taa hoon.',
    ta: 'வணக்கம்! உங்களுக்கு எனது அன்பான மரியாதையான வாழ்த்துகள்.',
    taPh: 'Va-nak-kam! Un-galuk-ku e-na-thu an-baa-na ma-ri-yaa-thai-yaa-na vaazhth-thu-gal.',
    taAcoustic: 'Vuh nuk kum! Oon guh look koo eh nuh thoo un baa nuh muh ree yaa thy yaa nuh vaazhth thoo gul.',
    source: 'grammar'
  }],

  [t => has(t, 'BOOK') && t.every(x => ['BOOK', 'PLEASE', 'I', 'NEED'].includes(x)), {
    en: 'I need my book or study material, please.',
    enPh: 'Pronunciation: Eye need my book or stud-ee muh-teer-ee-ul, pleez.',
    hi: 'मुझे कृपया मेरी किताब या पढ़ने की सामग्री चाहिए।',
    hiPh: 'Mu-jhe kri-pa-ya me-ree ki-taab yaa padh-ne kee saa-mag-ree chaa-hi-ye.',
    hiAcoustic: 'Moo jhay kri puh yaa may ree kee taab yaa pudh nay kee saa mug ree chaa hee yay.',
    ta: 'எனக்கு தயவுசெய்து என் புத்தகம் அல்லது படிக்கும் பொருள் வேண்டும்.',
    taPh: 'E-nak-ku tha-ya-vu-sey-thu en puth-tha-gam al-la-thu pa-dik-kum po-rul ven-dum.',
    taAcoustic: 'Eh nuk koo thuh yuh voo say thoo en pooth thuh gum ul luh thoo puh deek koom po rool vayn doom.',
    source: 'grammar'
  }],

  [t => has(t, 'WORK') && t.every(x => ['WORK', 'I', 'PLEASE', 'GO'].includes(x)), {
    en: 'I need to go to work now.',
    enPh: 'Pronunciation: Eye need tu goh tu wurk now.',
    hi: 'मुझे अभी अपने काम पर जाना है।',
    hiPh: 'Mu-jhe abhee ap-ne kaam par jaa-naa hai.',
    hiAcoustic: 'Moo jhay ub hee up nay kaam pur jaa naa hay.',
    ta: 'நான் இப்போது வேலைக்கு செல்ல வேண்டும்.',
    taPh: 'Naan ip-po-thu ve-laik-ku sel-la ven-dum.',
    taAcoustic: 'Naan eep po thoo vay ly kkoo chel luh vayn doom.',
    source: 'grammar'
  }],

  [t => has(t, 'YES') && !hasAny(t, 'NO', 'HELP', 'NEED', 'PAIN'), {
    en: 'Yes, please.',
    enPh: 'Pronunciation: Yes, pleez.',
    hi: 'हाँ, कृपया।',
    hiPh: 'Haan, kri-pa-ya.',
    hiAcoustic: 'Haan, kri puh yaa.',
    ta: 'ஆம், தயவுசெய்து.',
    taPh: 'Aam, tha-ya-vu-sey-thu.',
    taAcoustic: 'Aam, thuh yuh voo say thoo.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'NO', 'THANK_YOU'), {
    en: 'No, thank you so much, I am fine.',
    enPh: 'Pronunciation: No, thangk yoo soh much, eye am fyn.',
    hi: 'जी नहीं, बहुत-बहुत धन्यवाद, मैं ठीक हूँ।',
    hiPh: 'Jee na-heen, ba-hut ba-hut dhan-ya-vaad, main theek hoon.',
    hiAcoustic: 'Jee nuh heen, buh hoot buh hoot dhun yuh vaad, mye theek hoon.',
    ta: 'இல்லை, மிக்க நன்றி, நான் நலமாக இருக்கிறேன்.',
    taPh: 'Il-lai, mik-ka nan-dri, naan na-la-maa-ga iruk-ki-ren.',
    taAcoustic: 'Eel ly, meek kuh nun dree, naan nuh luh maa guh ee rook kee ren.',
    source: 'grammar'
  }],

  [t => has(t, 'NO') && !hasAny(t, 'YES', 'HELP', 'NEED', 'PAIN'), {
    en: 'No, thank you.',
    enPh: 'Pronunciation: No, thangk yoo.',
    hi: 'नहीं, धन्यवाद।',
    hiPh: 'Na-heen, dhan-ya-vaad.',
    hiAcoustic: 'Nuh heen, dhun yuh vaad.',
    ta: 'இல்லை, நன்றி.',
    taPh: 'Il-lai, nan-dri.',
    taAcoustic: 'Eel ly, nun dree.',
    source: 'grammar'
  }],

  [t => has(t, 'PLEASE') && t.length === 1, {
    en: 'Please, if you would be so kind.',
    enPh: 'Pronunciation: Pleez, if yoo wood bee soh kynd.',
    hi: 'कृपया, यदि आप कृपा करें।',
    hiPh: 'Kri-pa-ya, ya-di aap kri-paa ka-ren.',
    hiAcoustic: 'Kri puh yaa, yuh dee aap kri paa kuh ren.',
    ta: 'தயவுசெய்து, உங்கள் அன்புக்கு நன்றி.',
    taPh: 'Tha-ya-vu-sey-thu, un-gal an-buk-ku nan-dri.',
    taAcoustic: 'Thuh yuh voo say thoo, oon gul un book koo nun dree.',
    source: 'grammar'
  }],

  [t => has(t, 'OK') && t.length === 1, {
    en: 'Yes, that is completely fine and understood.',
    enPh: 'Pronunciation: Yes, that iz kum-pleet-lee fyn and un-der-stood.',
    hi: 'हाँ, बिल्कुल ठीक है, मैं समझ गया।',
    hiPh: 'Haan, bil-kul theek hai, main sa-majh ga-yaa.',
    hiAcoustic: 'Haan, bil kool theek hay, mye suh mujh guh yaa.',
    ta: 'ஆம், முற்றிலும் சரி, புரிந்து கொண்டேன்.',
    taPh: 'Aam, mut-ri-lum sa-ri, pu-rin-thu kon-den.',
    taAcoustic: 'Aam, moot ree loom suh ree, poo reen thoo kon dayn.',
    source: 'grammar'
  }],

  [t => has(t, 'WAIT') && t.length === 1, {
    en: 'Please wait a moment.',
    enPh: 'Pronunciation: Pleez wait a mo-ment.',
    hi: 'कृपया एक पल रुकिए।',
    hiPh: 'Kri-pa-ya ek pal ru-ki-ye.',
    hiAcoustic: 'Kri puh yaa ek pul roo kee yay.',
    ta: 'தயவுசெய்து ஒரு நிமிடம் காத்திருங்கள்.',
    taPh: 'Tha-ya-vu-sey-thu o-ru ni-mi-dam kaath-thi-run-gal.',
    taAcoustic: 'Thuh yuh voo say thoo oh roo nee mee dum kaath ee roong gul.',
    source: 'grammar'
  }],

  [t => hasAll(t, 'I', 'YOU'), {
    en: 'I am communicating with you.',
    enPh: 'Pronunciation: Eye am kum-myoo-ni-kayt-ing with yoo.',
    hi: 'मैं आपसे बात कर रहा/रही हूँ।',
    hiPh: 'Main aap-se baat kar ra-haa/ra-hee hoon.',
    hiAcoustic: 'Mye aap say baat kur ruh haa hoon.',
    ta: 'நான் உங்களிடம் பேசுகிறேன்.',
    taPh: 'Naan un-ga-li-dam pe-su-gi-ren.',
    taAcoustic: 'Naan oon guh lee dum pay soo gee ren.',
    source: 'grammar'
  }]
];

/**
 * Semantic Lexicon Model for Server-side Dynamic Grammar Synthesis
 */
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

function capFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/**
 * Server-side Dynamic Syntactic Grammar Assembler for arbitrary sign token combinations.
 */
export function synthesizeSemanticGrammar(tokens: string[]): GrammarResult {
  const norm = tokens.map(t => t.trim().toUpperCase().replace(/\s+/g, '_'));

  // Strip consecutive duplicate signs
  const deduped: string[] = [];
  for (const t of norm) {
    if (deduped.length === 0 || deduped[deduped.length - 1] !== t) {
      deduped.push(t);
    }
  }

  // Filter isolated filler words if substantive content exists
  const substantive = deduped.filter(t => !['OK', 'WAIT'].includes(t));
  const activeTokens = substantive.length > 0 ? substantive : deduped;

  const hasPlease = activeTokens.includes('PLEASE');
  const hasThanks = activeTokens.includes('THANK_YOU');
  const hasSorry  = activeTokens.includes('SORRY');
  const hasWhere  = activeTokens.includes('WHERE');
  const hasMore   = activeTokens.includes('MORE');
  const hasCall   = activeTokens.includes('CALL');
  const hasHelp   = activeTokens.includes('HELP');

  const facilityId = activeTokens.find(t => SEMANTIC_VOCAB[t]?.type === 'facility');
  const personId   = activeTokens.find(t => SEMANTIC_VOCAB[t]?.type === 'person');
  const itemId     = activeTokens.find(t => SEMANTIC_VOCAB[t]?.type === 'item');
  const stateId    = activeTokens.find(t => SEMANTIC_VOCAB[t]?.type === 'state');
  const actionId   = activeTokens.find(t => SEMANTIC_VOCAB[t]?.type === 'action');

  let enCore = '';
  let hiCore = '';
  let taCore = '';
  let hiPhCore = '';
  let taPhCore = '';

  // ── RULE 1: Question & Locational Queries ────────────────────────────────
  if (hasWhere) {
    if (facilityId) {
      const meta = SEMANTIC_VOCAB[facilityId];
      enCore = `where is the ${meta.en}`;
      hiCore = `${meta.hi} कहाँ है`;
      taCore = `${meta.ta} எங்கே உள்ளது`;
      hiPhCore = `${meta.hiPh} ka-haan hai`;
      taPhCore = `${meta.taPh} en-ge ul-la-thu`;
    } else if (personId) {
      const meta = SEMANTIC_VOCAB[personId];
      if (['MOTHER', 'FATHER', 'FAMILY', 'FRIEND'].includes(personId)) {
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
    } else if (itemId) {
      const meta = SEMANTIC_VOCAB[itemId];
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

  // ── RULE 2: Emergency & Calling Assistance ───────────────────────────────
  else if (hasCall || (hasHelp && (facilityId || personId))) {
    if (activeTokens.includes('AMBULANCE')) {
      enCore = `please call an ambulance right now`;
      hiCore = `कृपया तुरंत एम्बुलेंस को कॉल करें`;
      taCore = `தயவுசெய்து உடனடியாக ஆம்புலன்ஸ் அழையுங்கள்`;
      hiPhCore = `kri-pa-ya tu-rant am-bu-lance ko call ka-ren`;
      taPhCore = `tha-ya-vu-sey-thu u-da-na-di-yaa-ga aam-bu-lans a-zhai-yun-gal`;
    } else if (activeTokens.includes('POLICE')) {
      enCore = `emergency, please call the police immediately`;
      hiCore = `आपातकाल, कृपया तुरंत पुलिस को बुलाइए`;
      taCore = `அவசரம், தயவுசெய்து உடனடியாக காவல்துறையை அழைக்கவும்`;
      hiPhCore = `aa-paat-kaal, kri-pa-ya tu-rant pu-lis ko bu-laa-i-ye`;
      taPhCore = `a-va-sa-ram, tha-ya-vu-sey-thu u-da-na-di-yaa-ga kaa-val-thu-rai-yai a-zhai-yun-gal`;
    } else if (activeTokens.includes('DOCTOR')) {
      enCore = `please call a doctor for me`;
      hiCore = `कृपया मेरे लिए तुरंत डॉक्टर को बुलाइए`;
      taCore = `தயவுசெய்து எனக்காக உடனடியாக மருத்துவரை அழைக்கவும்`;
      hiPhCore = `kri-pa-ya me-re li-ye tu-rant doc-tor ko bu-laa-i-ye`;
      taPhCore = `tha-ya-vu-sey-thu e-nak-kaa-ga u-da-na-di-yaa-ga ma-ruth-thu-va-rai a-zhai-yun-gal`;
    } else if (personId) {
      const meta = SEMANTIC_VOCAB[personId];
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

  // ── RULE 3: State + Action / Destination Pairing ─────────────────────────
  else if (stateId && facilityId && stateId === 'TIRED' && facilityId === 'HOME') {
    enCore = `I am very tired and want to go home`;
    hiCore = `मैं बहुत थक गया हूँ और घर जाना चाहता हूँ`;
    taCore = `நான் மிகவும் சோர்வாக இருக்கிறேன், வீட்டிற்கு செல்ல வேண்டும்`;
    hiPhCore = `main ba-hut thak ga-yaa hoon aur ghar jaa-naa chaah-taa hoon`;
    taPhCore = `naan mi-ga-vum sor-vaa-ga iruk-ki-ren, veet-tir-ku sel-la ven-dum`;
  } else if (stateId && stateId === 'TIRED' && activeTokens.includes('SLEEP')) {
    enCore = `I am exhausted and urgently need to rest and sleep`;
    hiCore = `मैं बहुत थक गया हूँ और मुझे सोने की ज़रूरत है`;
    taCore = `நான் மிகவும் சோர்வாக இருக்கிறேன், தூங்க வேண்டும்`;
    hiPhCore = `main ba-hut thak ga-yaa hoon aur mu-jhe so-ne kee za-roo-rat hai`;
    taPhCore = `naan mi-ga-vum sor-vaa-ga iruk-ki-ren, thoon-ga ven-dum`;
  } else if (stateId && (stateId === 'PAIN' || stateId === 'HURT')) {
    if (itemId && itemId === 'MEDICINE') {
      enCore = `I am in severe pain and need my medicine`;
      hiCore = `मुझे बहुत दर्द हो रहा है और दवाई की ज़रूरत है`;
      taCore = `எனக்கு கடுமையான வலி உள்ளது, மருந்து தேவை`;
      hiPhCore = `mu-jhe ba-hut dard ho ra-haa hai aur da-vaa-ee kee za-roo-rat hai`;
      taPhCore = `e-nak-ku ka-du-mai-yaa-na va-li ul-la-thu, ma-run-thu the-vai`;
    } else if (personId && personId === 'DOCTOR') {
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
  } else if (stateId && stateId === 'HUNGRY') {
    enCore = `I am hungry and need something to eat`;
    hiCore = `मुझे बहुत भूख लगी है और खाने के लिए कुछ चाहिए`;
    taCore = `எனக்கு பசிக்கிறது, உணவு ஏதாவது வேண்டும்`;
    hiPhCore = `mu-jhe ba-hut bhookh la-gee hai aur khaa-ne ke li-ye kuchh chaa-hi-ye`;
    taPhCore = `e-nak-ku pa-sik-ki-ra-thu, u-na-vu e-thaa-va-thu ven-dum`;
  } else if (stateId && stateId === 'SICK') {
    enCore = `I am feeling sick and not well`;
    hiCore = `मेरी तबीयत ठीक नहीं है, मैं बीमार महसूस कर रहा हूँ`;
    taCore = `எனக்கு உடல்நிலை சரியில்லை, நோய்வாய்ப்பட்டுள்ளேன்`;
    hiPhCore = `me-ree ta-bee-yat theek na-heen hai, main bee-maar mah-soos kar ra-haa hoon`;
    taPhCore = `e-nak-ku u-dal-ni-lai sa-ri-yil-lai, noi-vaayp-pat-tul-len`;
  }

  // ── RULE 4: Item Requisition ─────────────────────────────────────────────
  else if (itemId) {
    const meta = SEMANTIC_VOCAB[itemId];
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

  // ── RULE 5: Emotional States ─────────────────────────────────────────────
  else if (stateId && stateId === 'HAPPY') {
    enCore = `I am feeling very happy today`;
    hiCore = `मैं आज बहुत खुश महसूस कर रहा हूँ`;
    taCore = `நான் இன்று மிகவும் மகிழ்ச்சியாக உணர்கிறேன்`;
    hiPhCore = `main aaj ba-hut khush mah-soos kar ra-haa hoon`;
    taPhCore = `naan in-ru mi-ga-vum ma-gizh-chi-yaa-ga u-nar-gi-ren`;
  } else if (stateId && stateId === 'SAD') {
    enCore = `I am feeling down and sad`;
    hiCore = `मैं बहुत उदास और दुखी महसूस कर रहा हूँ`;
    taCore = `நான் மிகவும் சோகமாக உணர்கிறேன்`;
    hiPhCore = `main ba-hut u-daas aur du-khee mah-soos kar ra-haa hoon`;
    taPhCore = `naan mi-ga-vum so-ga-maa-ga u-nar-gi-ren`;
  } else if (stateId && stateId === 'GOOD') {
    enCore = `I am feeling good and doing well`;
    hiCore = `मैं बिल्कुल अच्छा और स्वस्थ महसूस कर रहा हूँ`;
    taCore = `நான் நன்றாக நலமாக இருக்கிறேன்`;
    hiPhCore = `main bil-kul ach-chaa aur swasth mah-soos kar ra-haa hoon`;
    taPhCore = `naan nan-raa-ga na-la-maa-ga iruk-ki-ren`;
  } else if (stateId && stateId === 'BAD') {
    enCore = `I am not doing well`;
    hiCore = `मेरी हालत बिल्कुल अच्छी नहीं है`;
    taCore = `நான் நன்றாக உணரவில்லை`;
    hiPhCore = `me-ree haa-lat bil-kul ach-chhee na-heen hai`;
    taPhCore = `naan nan-raa-ga u-na-ra-vil-lai`;
  }

  // ── RULE 6: Action-only expressions ──────────────────────────────────────
  else if (actionId && actionId === 'WAIT') {
    enCore = `please wait a moment`;
    hiCore = `कृपया एक पल रुकिए`;
    taCore = `தயவுசெய்து ஒரு நிமிடம் காத்திருங்கள்`;
    hiPhCore = `kri-pa-ya ek pal ru-ki-ye`;
    taPhCore = `tha-ya-vu-sey-thu o-ru ni-mi-dam kaath-thi-run-gal`;
  } else if (actionId && actionId === 'FINISH') {
    enCore = `I am done and finished`;
    hiCore = `मेरा काम पूरा हो गया है`;
    taCore = `நான் வேலையை முடித்துவிட்டேன்`;
    hiPhCore = `me-raa kaam poo-raa ho ga-yaa hai`;
    taPhCore = `naan ve-lai-yai mu-dith-thu-vit-ten`;
  } else if (actionId && actionId === 'REPEAT') {
    enCore = `could you please repeat that once more`;
    hiCore = `कृपया एक बार फिर से दोहराइए`;
    taCore = `தயவுசெய்து மீண்டும் ஒருமுறை சொல்லுங்கள்`;
    hiPhCore = `kri-pa-ya ek baar phir se doh-raa-i-ye`;
    taPhCore = `tha-ya-vu-sey-thu meen-dum o-ru-mu-rai sol-lun-gal`;
  } else if (actionId && actionId === 'UNDERSTAND') {
    if (activeTokens.includes('NO')) {
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

  // ── Fallback Cohesive Assembly ───────────────────────────────────────────
  if (!enCore) {
    const cleanTokens = activeTokens.filter(t => !['PLEASE', 'HELLO', 'OK'].includes(t));
    enCore = cleanTokens.map(t => SEMANTIC_VOCAB[t]?.en || t.toLowerCase()).join(' ');
    hiCore = cleanTokens.map(t => SEMANTIC_VOCAB[t]?.hi || t).join(' ');
    taCore = cleanTokens.map(t => SEMANTIC_VOCAB[t]?.ta || t).join(' ');
  }

  // ── Conversational Framing & Politeness Synthesis ────────────────────────
  let finalEn = enCore;
  let finalHi = hiCore;
  let finalTa = taCore;

  // 1. Add Politeness Modifier
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

  // 2. Add Apology Prefix
  if (hasSorry && !finalEn.toLowerCase().startsWith('excuse me')) {
    finalEn = `Excuse me, ${finalEn}`;
    finalHi = `माफ़ कीजिए, ${finalHi}`;
    finalTa = `மன்னிக்கவும், ${finalTa}`;
  }

  // 3. Add Greetings Prefix
  if (activeTokens.includes('HELLO')) {
    finalEn = `Hello, ${finalEn}`;
    finalHi = `नमस्ते, ${finalHi}`;
    finalTa = `வணக்கம், ${finalTa}`;
  } else if (activeTokens.includes('NAMASTE')) {
    finalEn = `Namaste, ${finalEn}`;
    finalHi = `प्रणाम, ${finalHi}`;
    finalTa = `வணக்கம், ${finalTa}`;
  } else if (activeTokens.includes('MORNING')) {
    finalEn = `Good morning, ${finalEn}`;
    finalHi = `शुभ प्रभात, ${finalHi}`;
    finalTa = `காலை வணக்கம், ${finalTa}`;
  } else if (activeTokens.includes('NIGHT')) {
    finalEn = `Good night, ${finalEn}`;
    finalHi = `शुभ रात्रि, ${finalHi}`;
    finalTa = `இரவு வணக்கம், ${finalTa}`;
  }

  // 4. Add Gratitude Suffix
  if (hasThanks) {
    finalEn = `${finalEn}. Thank you very much.`;
    finalHi = `${finalHi}। बहुत-बहुत धन्यवाद।`;
    finalTa = `${finalTa}. மிக்க நன்றி.`;
  }

  // Proper Sentence Punctuation
  finalEn = capFirst(finalEn.trim());
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

  const hiPhDisplay = hiPhCore || activeTokens.map(t => SEMANTIC_VOCAB[t]?.hiPh || t).join(', ');
  const taPhDisplay = taPhCore || activeTokens.map(t => SEMANTIC_VOCAB[t]?.taPh || t).join(', ');

  return {
    en: finalEn,
    enPh: 'Pronunciation: ' + activeTokens.map(t => SEMANTIC_VOCAB[t]?.en || t).join(' - '),
    hi: finalHi,
    hiPh: hiPhDisplay,
    hiAcoustic: hiPhDisplay.replace(/-/g, ' '),
    ta: finalTa,
    taPh: taPhDisplay,
    taAcoustic: taPhDisplay.replace(/-/g, ' '),
    source: 'grammar'
  };
}

/**
 * Apply grammar rules to a normalized token list (upper-snake-case sign IDs).
 * Returns null if no pattern matches, allowing fallback to smart semantic synthesis or Gemini.
 */
export function applyGrammarRules(tokens: string[]): GrammarResult | null {
  const norm = tokens.map(t => t.trim().toUpperCase().replace(/\s+/g, '_'));
  for (const [matcher, result] of PATTERNS) {
    if (matcher(norm)) return result;
  }
  return null;
}
