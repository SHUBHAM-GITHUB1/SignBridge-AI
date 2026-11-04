import { SignItem } from '../types/sign.js';

export const BASE_SIGNS: SignItem[] = [
  // ── Core 16 ─────────────────────────────────────────────────────────────────
  {
    id: 'HELLO', en: 'Hello',
    hi: 'नमस्ते', hiPh: 'Na-mas-te', hiAcoustic: 'Nuh-mus-tay',
    ta: 'வணக்கம்', taPh: 'Va-nak-kam', taAcoustic: 'Vuh-nuk-kum',
    category: 'Core', zone: 'UPPER', hint: 'Open Palm — All 5 fingers extended flat',
    fingers: [1,1,1,1,1], poseType: 'open_spread'
  },
  {
    id: 'I', en: 'I / Me',
    hi: 'मैं / मुझे', hiPh: 'Main / Mu-jhe', hiAcoustic: 'Moo-jhay',
    ta: 'நான் / எனக்கு', taPh: 'Naan / E-nak-ku', taAcoustic: 'Eh-nuk-koo',
    category: 'Core', zone: 'MID', hint: 'Index Finger pointing up only',
    fingers: [0,1,0,0,0], poseType: 'index_up'
  },
  {
    id: 'YOU', en: 'You',
    hi: 'आप', hiPh: 'Aap', hiAcoustic: 'Aap',
    ta: 'நீங்கள்', taPh: 'Neen-gal', taAcoustic: 'Neen-gul',
    category: 'Core', zone: 'MID', hint: 'L-Shape — Thumb + Index, point forward',
    fingers: [1,1,0,0,0], poseType: 'l_shape'
  },
  {
    id: 'YES', en: 'Yes',
    hi: 'हाँ', hiPh: 'Haan', hiAcoustic: 'Haan',
    ta: 'ஆம்', taPh: 'Aam', taAcoustic: 'Aam',
    category: 'Core', zone: 'MID', hint: 'Thumbs Up — thumb pointing upward',
    fingers: [1,0,0,0,0], poseType: 'thumb_up'
  },
  {
    id: 'NO', en: 'No',
    hi: 'नहीं', hiPh: 'Na-heen', hiAcoustic: 'Nuh-heen',
    ta: 'இல்லை', taPh: 'Il-lai', taAcoustic: 'Ill-eye',
    category: 'Core', zone: 'LOWER', hint: 'Thumb Down — thumb pointing downward',
    fingers: [1,0,0,0,0], poseType: 'thumb_down'
  },
  {
    id: 'WATER', en: 'Water',
    hi: 'पानी', hiPh: 'Paa-nee', hiAcoustic: 'Paa-nee',
    ta: 'தண்ணீர்', taPh: 'Than-neer', taAcoustic: 'Thun-neer',
    category: 'Core', zone: 'UPPER', hint: 'W-Sign — Index + Middle + Ring up, thumb + pinky curled',
    fingers: [0,1,1,1,0], poseType: 'w_sign'
  },
  {
    id: 'FOOD', en: 'Food',
    hi: 'खाना', hiPh: 'Khaa-naa', hiAcoustic: 'Khaa-naa',
    ta: 'உணவு', taPh: 'U-na-vu', taAcoustic: 'Oo-nuh-voo',
    category: 'Core', zone: 'UPPER', hint: 'Food Pinch — fingertips pinched to mouth',
    fingers: [1,0,0,0,0], poseType: 'food_pinch'
  },
  {
    id: 'HELP', en: 'Help',
    hi: 'मदद', hiPh: 'Ma-dad', hiAcoustic: 'Muh-dud',
    ta: 'உதவி', taPh: 'U-tha-vi', taAcoustic: 'Oo-thuh-vee',
    category: 'Core', zone: 'MID', hint: 'ILY Sign — Thumb + Index + Pinky extended',
    fingers: [1,1,0,0,1], poseType: 'ily_sign'
  },
  {
    id: 'NEED', en: 'Need',
    hi: 'चाहिए', hiPh: 'Chaa-hi-ye', hiAcoustic: 'Chaa-hee-yay',
    ta: 'வேண்டும்', taPh: 'Ven-dum', taAcoustic: 'Vayn-doom',
    category: 'Core', zone: 'MID', hint: 'Three Fingers — Thumb + Index + Middle up',
    fingers: [1,1,1,0,0], poseType: 'three_thumb'
  },
  {
    id: 'THANK_YOU', en: 'Thank You',
    hi: 'धन्यवाद', hiPh: 'Dhan-ya-vaad', hiAcoustic: 'Dhun-yuh-vaad',
    ta: 'நன்றி', taPh: 'Nan-dri', taAcoustic: 'Nun-dree',
    category: 'Core', zone: 'UPPER', hint: 'Pinky Up — only pinky extended straight',
    fingers: [0,0,0,0,1], poseType: 'pinky_up'
  },
  {
    id: 'PLEASE', en: 'Please',
    hi: 'कृपया', hiPh: 'Kri-pa-ya', hiAcoustic: 'Kri-puh-yaa',
    ta: 'தயவுசெய்து', taPh: 'Tha-ya-vu-sey-thu', taAcoustic: 'Thuh-yuh-voo-say-thoo',
    category: 'Core', zone: 'MID', hint: 'Closed Fist — all fingers curled',
    fingers: [0,0,0,0,0], poseType: 'closed_fist'
  },
  {
    id: 'WAIT', en: 'Wait / Stop',
    hi: 'रुकिए', hiPh: 'Ru-ki-ye', hiAcoustic: 'Roo-kee-yay',
    ta: 'காத்திருங்கள்', taPh: 'Kaath-thi-run-gal', taAcoustic: 'Kaath-ee-roong-gul',
    category: 'Core', zone: 'MID', hint: 'Four Up — 4 fingers up, thumb tucked',
    fingers: [0,1,1,1,1], poseType: 'four_up'
  },
  {
    id: 'DOCTOR', en: 'Doctor',
    hi: 'डॉक्टर', hiPh: 'Doc-tor', hiAcoustic: 'Doc-tur',
    ta: 'மருத்துவர்', taPh: 'Ma-ruth-thu-var', taAcoustic: 'Muh-rooth-thoo-vur',
    category: 'Medical', zone: 'UPPER', hint: 'Shaka — Thumb + Pinky extended',
    fingers: [1,0,0,0,1], poseType: 'shaka_call'
  },
  {
    id: 'WHERE', en: 'Where?',
    hi: 'कहाँ है?', hiPh: 'Ka-haan hai?', hiAcoustic: 'Kuh-haan hay?',
    ta: 'எங்கே?', taPh: 'En-ge?', taAcoustic: 'En-gay?',
    category: 'Core', zone: 'MID', hint: 'Horns — Index + Pinky up, shaking',
    fingers: [0,1,0,0,1], poseType: 'horns_where'
  },
  {
    id: 'BATHROOM', en: 'Restroom',
    hi: 'शौचालय', hiPh: 'Shau-chaa-lay', hiAcoustic: 'Show-chaa-luy',
    ta: 'கழிப்பறை', taPh: 'Ka-zhip-pa-rai', taAcoustic: 'Kuh-zhip-puh-rye',
    category: 'Core', zone: 'MID', hint: 'Peace / V-Sign — Index + Middle up',
    fingers: [0,1,1,0,0], poseType: 'v_peace'
  },
  {
    id: 'OK', en: 'OK / Good',
    hi: 'ठीक है', hiPh: 'Theek hai', hiAcoustic: 'Theek hay',
    ta: 'சரி', taPh: 'Sa-ri', taAcoustic: 'Suh-ree',
    category: 'Core', zone: 'MID', hint: 'OK Circle — Thumb + Index circle, 3 fingers up',
    fingers: [1,0,1,1,1], poseType: 'ok_circle'
  },

  // ── New Signs ────────────────────────────────────────────────────────────────
  {
    id: 'PAIN', en: 'Pain / Hurt',
    hi: 'दर्द', hiPh: 'Dard', hiAcoustic: 'Durd',
    ta: 'வலி', taPh: 'Va-li', taAcoustic: 'Vuh-lee',
    category: 'Medical', zone: 'MID', hint: 'Hook Index — only index bent like a hook, others curled',
    fingers: [0,1,0,0,0], poseType: 'hook_index'
  },
  {
    id: 'MORE', en: 'More',
    hi: 'और / अधिक', hiPh: 'Aur / A-dhik', hiAcoustic: 'Ore / Uh-dhik',
    ta: 'மேலும்', taPh: 'Me-lum', taAcoustic: 'May-loom',
    category: 'Core', zone: 'MID', hint: 'Flat-O — all fingertips touching thumb',
    fingers: [1,1,1,1,1], poseType: 'flat_o'
  },
  {
    id: 'DRINK', en: 'Drink / Water',
    hi: 'पीना / पानी', hiPh: 'Pee-naa / Paa-nee', hiAcoustic: 'Pee-naa',
    ta: 'குடிக்க', taPh: 'Ku-dik-ka', taAcoustic: 'Koo-dik-kuh',
    category: 'Food', zone: 'UPPER', hint: 'C-Cup — curved hand tipped to lips',
    fingers: [0,1,1,1,0], poseType: 'c_curve'
  },
  {
    id: 'MEDICINE', en: 'Medicine',
    hi: 'दवाई', hiPh: 'Da-vaa-ee', hiAcoustic: 'Duh-vaa-ee',
    ta: 'மருந்து', taPh: 'Ma-run-thu', taAcoustic: 'Muh-roon-thoo',
    category: 'Medical', zone: 'MID', hint: 'Middle Tap — middle finger touches palm (M-shape)',
    fingers: [0,0,1,0,0], poseType: 'middle_tap'
  },
  {
    id: 'SORRY', en: 'Sorry',
    hi: 'माफ़ करें', hiPh: 'Maaf ka-ren', hiAcoustic: 'Maaf kuh-ren',
    ta: 'மன்னிக்கவும்', taPh: 'Man-nik-ka-vum', taAcoustic: 'Mun-neek-kuh-voom',
    category: 'Core', zone: 'MID', hint: 'A-Fist — closed fist, thumb alongside, circle on chest',
    fingers: [1,0,0,0,0], poseType: 'a_fist'
  },
  {
    id: 'FINISH', en: 'Done / Finished',
    hi: 'हो गया', hiPh: 'Ho ga-ya', hiAcoustic: 'Ho guh-yaa',
    ta: 'முடிந்தது', taPh: 'Mu-dain-tha-thu', taAcoustic: 'Moo-dyne-thuh-thoo',
    category: 'Core', zone: 'MID', hint: 'Five-Shake — open palm flipped outward quickly',
    fingers: [1,1,1,1,1], poseType: 'five_shake'
  },
  {
    id: 'GOOD', en: 'Good',
    hi: 'अच्छा', hiPh: 'Ach-chaa', hiAcoustic: 'Uch-chaa',
    ta: 'நல்லது', taPh: 'Nal-la-thu', taAcoustic: 'Nul-luh-thoo',
    category: 'Core', zone: 'MID', hint: 'Flat-B — four fingers flat together, thumb across',
    fingers: [0,1,1,1,1], poseType: 'flat_b'
  },
  {
    id: 'BAD', en: 'Bad',
    hi: 'बुरा', hiPh: 'Bu-raa', hiAcoustic: 'Boo-raa',
    ta: 'மோசம்', taPh: 'Mo-sam', taAcoustic: 'Mo-sum',
    category: 'Core', zone: 'LOWER', hint: 'B-Hand flipped down — four fingers down',
    fingers: [0,1,1,1,1], poseType: 'flat_b_down'
  },
  {
    id: 'HUNGRY', en: 'Hungry',
    hi: 'भूखा', hiPh: 'Bhoo-khaa', hiAcoustic: 'Bhoo-khaa',
    ta: 'பசி', taPh: 'Pa-si', taAcoustic: 'Puh-see',
    category: 'Feelings', zone: 'MID', hint: 'C-Hand to chest — curved hand slides down front',
    fingers: [0,1,1,1,0], poseType: 'c_chest'
  },
  {
    id: 'TIRED', en: 'Tired',
    hi: 'थका हुआ', hiPh: 'Tha-kaa hu-aa', hiAcoustic: 'Thuh-kaa hoo-aa',
    ta: 'சோர்வு', taPh: 'Sor-vu', taAcoustic: 'Sore-voo',
    category: 'Feelings', zone: 'LOWER', hint: 'B-Hands drop — both hands fall from chest (use one)',
    fingers: [0,1,1,1,1], poseType: 'four_down'
  },
  {
    id: 'HAPPY', en: 'Happy',
    hi: 'खुश', hiPh: 'Khush', hiAcoustic: 'Koosh',
    ta: 'மகிழ்ச்சி', taPh: 'Ma-gizh-chi', taAcoustic: 'Muh-geezh-chee',
    category: 'Feelings', zone: 'MID', hint: 'Open palm to chest (brushing up)',
    fingers: [1,1,1,1,1], poseType: 'open_up'
  },
  {
    id: 'SAD', en: 'Sad',
    hi: 'दुखी', hiPh: 'Du-khee', hiAcoustic: 'Doo-khee',
    ta: 'சோகம்', taPh: 'So-gam', taAcoustic: 'So-gum',
    category: 'Feelings', zone: 'LOWER', hint: 'Open hands slide down face',
    fingers: [1,1,1,1,1], poseType: 'open_down'
  },
  {
    id: 'HOME', en: 'Home',
    hi: 'घर', hiPh: 'Ghar', hiAcoustic: 'Ghur',
    ta: 'வீடு', taPh: 'Vee-du', taAcoustic: 'Vee-doo',
    category: 'HomeWork', zone: 'MID', hint: 'Flat O to cheek — fingertips touching at mouth then cheek',
    fingers: [1,0,1,1,1], poseType: 'flat_o_cheek'
  },
  {
    id: 'HOSPITAL', en: 'Hospital',
    hi: 'अस्पताल', hiPh: 'As-pa-taal', hiAcoustic: 'Us-puh-taal',
    ta: 'மருத்துவமனை', taPh: 'Ma-ruth-thu-va-ma-nai', taAcoustic: 'Muh-rooth-thoo-vuh-muh-nye',
    category: 'Medical', zone: 'UPPER', hint: 'H-Sign on arm — index + middle cross on upper arm',
    fingers: [0,1,1,0,0], poseType: 'h_sign'
  },
  {
    id: 'POLICE', en: 'Police',
    hi: 'पुलिस', hiPh: 'Pu-lis', hiAcoustic: 'Poo-lis',
    ta: 'காவல்துறை', taPh: 'Kaa-val-thu-rai', taAcoustic: 'Kaa-vul-thoo-rye',
    category: 'Emergency', zone: 'UPPER', hint: 'P-Sign — index + middle bent, thumb pointing',
    fingers: [1,1,1,0,0], poseType: 'p_sign'
  },
  {
    id: 'CALL', en: 'Call / Phone',
    hi: 'फ़ोन करें', hiPh: 'Phone ka-ren', hiAcoustic: 'Phone kuh-ren',
    ta: 'அழைக்க', taPh: 'A-zhaik-ka', taAcoustic: 'Uh-zhy-kuh',
    category: 'Actions', zone: 'UPPER', hint: 'Phone Shaka — thumb + pinky at ear',
    fingers: [1,0,0,0,1], poseType: 'shaka_ear'
  },
  {
    id: 'SLEEP', en: 'Sleep',
    hi: 'सोना', hiPh: 'So-naa', hiAcoustic: 'So-naa',
    ta: 'தூக்கம்', taPh: 'Thook-kam', taAcoustic: 'Thook-kum',
    category: 'Actions', zone: 'LOWER', hint: 'Head tilt with open hand to cheek',
    fingers: [1,0,1,1,1], poseType: 'sleep_tilt'
  },
  {
    id: 'TIME', en: 'Time',
    hi: 'समय', hiPh: 'Sa-may', hiAcoustic: 'Suh-may',
    ta: 'நேரம்', taPh: 'Ne-ram', taAcoustic: 'Nay-rum',
    category: 'TimeNum', zone: 'MID', hint: 'T-Sign — tap wrist with bent index',
    fingers: [0,1,0,0,0], poseType: 't_tap'
  },
  {
    id: 'FAMILY', en: 'Family',
    hi: 'परिवार', hiPh: 'Pa-ri-vaar', hiAcoustic: 'Puh-ree-vaar',
    ta: 'குடும்பம்', taPh: 'Ku-dum-bam', taAcoustic: 'Koo-doom-bum',
    category: 'Family', zone: 'MID', hint: 'F-Circle — both thumbs + index circle outward',
    fingers: [1,1,0,0,1], poseType: 'f_circle'
  },
  {
    id: 'MOTHER', en: 'Mother / Mom',
    hi: 'माँ', hiPh: 'Maa', hiAcoustic: 'Maa',
    ta: 'அம்மா', taPh: 'Am-maa', taAcoustic: 'Um-maa',
    category: 'Family', zone: 'MID', hint: 'Five-Hand chin — open hand taps chin (thumb side)',
    fingers: [1,1,1,1,1], poseType: 'five_chin'
  },
  {
    id: 'FATHER', en: 'Father / Dad',
    hi: 'पिताजी', hiPh: 'Pi-taa-jee', hiAcoustic: 'Pee-taa-jee',
    ta: 'அப்பா', taPh: 'Ap-paa', taAcoustic: 'Up-paa',
    category: 'Family', zone: 'UPPER', hint: 'Five-Hand forehead — open hand taps forehead',
    fingers: [1,1,1,1,1], poseType: 'five_head'
  },
  {
    id: 'FRIEND', en: 'Friend',
    hi: 'दोस्त', hiPh: 'Dost', hiAcoustic: 'Dost',
    ta: 'நண்பர்', taPh: 'Nan-bar', taAcoustic: 'Nun-bur',
    category: 'Family', zone: 'MID', hint: 'Hook Link — both index fingers hooked and flipped',
    fingers: [0,1,0,0,0], poseType: 'hook_link'
  },
  {
    id: 'UNDERSTAND', en: 'Understand',
    hi: 'समझना', hiPh: 'Sa-majh-naa', hiAcoustic: 'Suh-muj-naa',
    ta: 'புரிகிறது', taPh: 'Pu-ri-gi-ra-thu', taAcoustic: 'Poo-ree-gee-ruh-thoo',
    category: 'Core', zone: 'MID', hint: 'Index flick — bent index flicks up at temple',
    fingers: [0,1,0,0,0], poseType: 'index_flick'
  },
  {
    id: 'REPEAT', en: 'Repeat / Again',
    hi: 'फिर से', hiPh: 'Phir se', hiAcoustic: 'Fur say',
    ta: 'மீண்டும்', taPh: 'Meen-dum', taAcoustic: 'Meen-doom',
    category: 'Core', zone: 'MID', hint: 'Arc touch — bent fingers tap flat palm',
    fingers: [1,1,1,0,0], poseType: 'arc_tap'
  },
  {
    id: 'MORNING', en: 'Morning',
    hi: 'सुबह', hiPh: 'Su-bah', hiAcoustic: 'Soo-buh',
    ta: 'காலை', taPh: 'Kaa-lai', taAcoustic: 'Kaa-lye',
    category: 'TimeNum', zone: 'UPPER', hint: 'Rising arm — forearm rising up from horizontal',
    fingers: [1,1,1,1,1], poseType: 'arm_rise'
  },
  {
    id: 'NIGHT', en: 'Night',
    hi: 'रात', hiPh: 'Raat', hiAcoustic: 'Raat',
    ta: 'இரவு', taPh: 'I-ra-vu', taAcoustic: 'Ee-ruh-voo',
    category: 'TimeNum', zone: 'LOWER', hint: 'Bent hand down — curved hand arcs downward',
    fingers: [0,1,1,1,0], poseType: 'arc_down'
  },
  {
    id: 'NAMASTE', en: 'Namaste / Respect',
    hi: 'नमस्ते / प्रणाम', hiPh: 'Na-mas-te / Pra-naam', hiAcoustic: 'Nuh-mus-tay',
    ta: 'வணக்கம்', taPh: 'Va-nak-kam', taAcoustic: 'Vuh-nuk-kum',
    category: 'Core', zone: 'MID', hint: 'Two Hands Pressed Together at chest',
    fingers: [1,1,1,1,1], poseType: 'namaste_two_hands', isTwoHanded: true
  },
  {
    id: 'BOOK', en: 'Book / Study',
    hi: 'किताब / पढ़ना', hiPh: 'Ki-taab / Padh-naa', hiAcoustic: 'Kee-taab',
    ta: 'புத்தகம்', taPh: 'Puth-tha-gam', taAcoustic: 'Pooth-thuh-gum',
    category: 'HomeWork', zone: 'MID', hint: 'Two Hands Opening like a Book',
    fingers: [1,1,1,1,1], poseType: 'book_two_hands', isTwoHanded: true
  },
  {
    id: 'WORK', en: 'Work / Job',
    hi: 'काम / नौकरी', hiPh: 'Kaam / Nauk-ree', hiAcoustic: 'Kaam',
    ta: 'வேலை', taPh: 'Ve-lai', taAcoustic: 'Vay-lye',
    category: 'HomeWork', zone: 'MID', hint: 'Fist tapping other wrist',
    fingers: [0,0,0,0,0], poseType: 'work_two_hands', isTwoHanded: true
  },
];

export const QUICK_STARTERS = [
  { label: '💧 Need Water',    ids: ['HELLO', 'I', 'NEED', 'WATER', 'PLEASE'] },
  { label: '🍲 Need Food',     ids: ['HELLO', 'I', 'NEED', 'FOOD',  'PLEASE'] },
  { label: '🩺 Need Doctor',   ids: ['HELP', 'I', 'NEED', 'DOCTOR'] },
  { label: '😣 I Am In Pain',  ids: ['I', 'PAIN', 'HELP', 'PLEASE'] },
  { label: '🏥 Hospital',      ids: ['WHERE', 'HOSPITAL'] },
  { label: '🚻 Restroom?',     ids: ['WHERE', 'BATHROOM', 'PLEASE'] },
  { label: '🙏 Thank You',     ids: ['THANK_YOU', 'OK'] },
  { label: '😴 Need Sleep',    ids: ['I', 'TIRED', 'NEED', 'SLEEP'] },
];

export const CATEGORIES = [
  'All Signs', 'Core', 'Medical', 'Emergency', 'Food', 'Feelings',
  'Actions', 'Family', 'TimeNum', 'HomeWork', 'A–Z Spell'
];
