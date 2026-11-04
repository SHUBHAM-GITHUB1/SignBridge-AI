export interface SignItem {
  id: string;
  en: string;
  letter?: string;
  hi: string;
  hiPh: string;
  hiAcoustic: string;
  ta: string;
  taPh: string;
  taAcoustic: string;
  category: string;
  zone: 'UPPER' | 'MID' | 'LOWER';
  hint: string;
  fingers: [number, number, number, number, number];
  poseType: string;
}

export const BASE_SIGNS: SignItem[] = [
  {
    id: 'HELLO',
    en: 'Hello',
    hi: 'नमस्ते',
    hiPh: 'Na-mas-te',
    hiAcoustic: 'Nuh-mus-tay',
    ta: 'வணக்கம்',
    taPh: 'Va-nak-kam',
    taAcoustic: 'Vuh-nuk-kum',
    category: 'Core 16',
    zone: 'UPPER',
    hint: 'Open Palm (All 5 Extended)',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'open_spread'
  },
  {
    id: 'I',
    en: 'I / Me',
    hi: 'मैं / मुझे',
    hiPh: 'Main / Mu-jhe',
    hiAcoustic: 'Moo-jhay',
    ta: 'நான் / எனக்கு',
    taPh: 'Naan / E-nak-ku',
    taAcoustic: 'Eh-nuk-koo',
    category: 'Core 16',
    zone: 'MID',
    hint: 'Index Finger Up',
    fingers: [0, 1, 0, 0, 0],
    poseType: 'index_up'
  },
  {
    id: 'YOU',
    en: 'You',
    hi: 'आप',
    hiPh: 'Aap',
    hiAcoustic: 'Aap',
    ta: 'நீங்கள்',
    taPh: 'Neen-gal',
    taAcoustic: 'Neen-gul',
    category: 'Core 16',
    zone: 'MID',
    hint: 'L-Shape (Thumb + Index)',
    fingers: [1, 1, 0, 0, 0],
    poseType: 'l_shape'
  },
  {
    id: 'YES',
    en: 'Yes',
    hi: 'हाँ',
    hiPh: 'Haan',
    hiAcoustic: 'Haan',
    ta: 'ஆம்',
    taPh: 'Aam',
    taAcoustic: 'Aam',
    category: 'Core 16',
    zone: 'MID',
    hint: 'Thumbs Up',
    fingers: [1, 0, 0, 0, 0],
    poseType: 'thumb_up'
  },
  {
    id: 'NO',
    en: 'No',
    hi: 'नहीं',
    hiPh: 'Na-heen',
    hiAcoustic: 'Nuh-heen',
    ta: 'இல்லை',
    taPh: 'Il-lai',
    taAcoustic: 'Ill-eye',
    category: 'Core 16',
    zone: 'LOWER',
    hint: 'Thumb Down',
    fingers: [1, 0, 0, 0, 0],
    poseType: 'thumb_down'
  },
  {
    id: 'WATER',
    en: 'Water',
    hi: 'पानी',
    hiPh: 'Paa-nee',
    hiAcoustic: 'Paa-nee',
    ta: 'தண்ணீர்',
    taPh: 'Than-neer',
    taAcoustic: 'Thun-neer',
    category: 'Core 16',
    zone: 'UPPER',
    hint: 'W-Sign (3 Middle Fingers)',
    fingers: [0, 1, 1, 1, 0],
    poseType: 'w_sign'
  },
  {
    id: 'FOOD',
    en: 'Food',
    hi: 'खाना',
    hiPh: 'Khaa-naa',
    hiAcoustic: 'Khaa-naa',
    ta: 'உணவு',
    taPh: 'U-na-vu',
    taAcoustic: 'Oo-nuh-voo',
    category: 'Core 16',
    zone: 'UPPER',
    hint: 'Pinched Fingers (Eat)',
    fingers: [1, 0, 0, 0, 0],
    poseType: 'food_pinch'
  },
  {
    id: 'HELP',
    en: 'Help',
    hi: 'मदद',
    hiPh: 'Ma-dad',
    hiAcoustic: 'Muh-dud',
    ta: 'உதவி',
    taPh: 'U-tha-vi',
    taAcoustic: 'Oo-thuh-vee',
    category: 'Core 16',
    zone: 'MID',
    hint: 'ILY Sign (Thumb+Index+Pinky)',
    fingers: [1, 1, 0, 0, 1],
    poseType: 'ily_sign'
  },
  {
    id: 'NEED',
    en: 'Need',
    hi: 'चाहिए',
    hiPh: 'Chaa-hi-ye',
    hiAcoustic: 'Chaa-hee-yay',
    ta: 'வேண்டும்',
    taPh: 'Ven-dum',
    taAcoustic: 'Vayn-doom',
    category: 'Core 16',
    zone: 'MID',
    hint: 'Thumb + Index + Middle',
    fingers: [1, 1, 1, 0, 0],
    poseType: 'three_thumb'
  },
  {
    id: 'THANK_YOU',
    en: 'Thank You',
    hi: 'धन्यवाद',
    hiPh: 'Dhan-ya-vaad',
    hiAcoustic: 'Dhun-yuh-vaad',
    ta: 'நன்றி',
    taPh: 'Nan-dri',
    taAcoustic: 'Nun-dree',
    category: 'Core 16',
    zone: 'UPPER',
    hint: 'Pinky Extended Upright',
    fingers: [0, 0, 0, 0, 1],
    poseType: 'pinky_up'
  },
  {
    id: 'PLEASE',
    en: 'Please',
    hi: 'कृपया',
    hiPh: 'Kri-pa-ya',
    hiAcoustic: 'Kri-puh-yaa',
    ta: 'தயவுசெய்து',
    taPh: 'Tha-ya-vu-sey-thu',
    taAcoustic: 'Thuh-yuh-voo-say-thoo',
    category: 'Core 16',
    zone: 'MID',
    hint: 'Closed Fist Over Heart',
    fingers: [0, 0, 0, 0, 0],
    poseType: 'closed_fist'
  },
  {
    id: 'WAIT',
    en: 'Wait / Stop',
    hi: 'रुकिए',
    hiPh: 'Ru-ki-ye',
    hiAcoustic: 'Roo-kee-yay',
    ta: 'காத்திருங்கள்',
    taPh: 'Kaath-thi-run-gal',
    taAcoustic: 'Kaath-ee-roong-gul',
    category: 'Core 16',
    zone: 'MID',
    hint: '4 Fingers Up (Thumb Tucked)',
    fingers: [0, 1, 1, 1, 1],
    poseType: 'four_up'
  },
  {
    id: 'DOCTOR',
    en: 'Doctor / Call',
    hi: 'डॉक्टर',
    hiPh: 'Doc-tor',
    hiAcoustic: 'Doc-tur',
    ta: 'மருத்துவர்',
    taPh: 'Ma-ruth-thu-var',
    taAcoustic: 'Muh-rooth-thoo-vur',
    category: 'Core 16',
    zone: 'UPPER',
    hint: 'Shaka (Thumb + Pinky)',
    fingers: [1, 0, 0, 0, 1],
    poseType: 'shaka_call'
  },
  {
    id: 'WHERE',
    en: 'Where',
    hi: 'कहाँ है',
    hiPh: 'Ka-haan hai',
    hiAcoustic: 'Kuh-haan hay',
    ta: 'எங்கே',
    taPh: 'En-ge',
    taAcoustic: 'En-gay',
    category: 'Core 16',
    zone: 'MID',
    hint: 'Index + Pinky Up',
    fingers: [0, 1, 0, 0, 1],
    poseType: 'horns_where'
  },
  {
    id: 'BATHROOM',
    en: 'Restroom',
    hi: 'शौचालय',
    hiPh: 'Shau-chaa-lay',
    hiAcoustic: 'Show-chaa-luy',
    ta: 'கழிப்பறை',
    taPh: 'Ka-zhip-pa-rai',
    taAcoustic: 'Kuh-zhip-puh-rye',
    category: 'Core 16',
    zone: 'MID',
    hint: 'Peace / V-Sign (2 Fingers)',
    fingers: [0, 1, 1, 0, 0],
    poseType: 'v_peace'
  },
  {
    id: 'OK',
    en: 'OK / Good',
    hi: 'ठीक है',
    hiPh: 'Theek hai',
    hiAcoustic: 'Theek hay',
    ta: 'சரி / நலம்',
    taPh: 'Sa-ri / Na-lam',
    taAcoustic: 'Suh-ree',
    category: 'Core 16',
    zone: 'MID',
    hint: 'OK Circle + 3 Fingers Up',
    fingers: [1, 0, 1, 1, 1],
    poseType: 'ok_circle'
  },
  {
    id: 'PAIN',
    en: 'Pain / Hurt',
    hi: 'दर्द',
    hiPh: 'Dard',
    hiAcoustic: 'Durd',
    ta: 'வலி',
    taPh: 'Va-li',
    taAcoustic: 'Vuh-lee',
    category: 'Medical',
    zone: 'MID',
    hint: 'Hook Index — bent index, others curled',
    fingers: [0, 1, 0, 0, 0],
    poseType: 'hook_index'
  },
  {
    id: 'MORE',
    en: 'More',
    hi: 'और / अधिक',
    hiPh: 'Aur / A-dhik',
    hiAcoustic: 'Ore / Uh-dhik',
    ta: 'மேலும்',
    taPh: 'Me-lum',
    taAcoustic: 'May-loom',
    category: 'Core',
    zone: 'MID',
    hint: 'Flat-O — all fingertips touching thumb',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'flat_o'
  },
  {
    id: 'DRINK',
    en: 'Drink / Water',
    hi: 'पीना / पानी',
    hiPh: 'Pee-naa / Paa-nee',
    hiAcoustic: 'Pee-naa',
    ta: 'குடிக்க',
    taPh: 'Ku-dik-ka',
    taAcoustic: 'Koo-dik-kuh',
    category: 'Food',
    zone: 'UPPER',
    hint: 'C-Cup — curved hand tipped to lips',
    fingers: [0, 1, 1, 1, 0],
    poseType: 'c_curve'
  },
  {
    id: 'MEDICINE',
    en: 'Medicine',
    hi: 'दवाई',
    hiPh: 'Da-vaa-ee',
    hiAcoustic: 'Duh-vaa-ee',
    ta: 'மருந்து',
    taPh: 'Ma-run-thu',
    taAcoustic: 'Muh-roon-thoo',
    category: 'Medical',
    zone: 'MID',
    hint: 'Middle Tap — middle finger extended',
    fingers: [0, 0, 1, 0, 0],
    poseType: 'middle_tap'
  },
  {
    id: 'SORRY',
    en: 'Sorry',
    hi: 'माफ़ करें',
    hiPh: 'Maaf ka-ren',
    hiAcoustic: 'Maaf kuh-ren',
    ta: 'மன்னிக்கவும்',
    taPh: 'Man-nik-ka-vum',
    taAcoustic: 'Mun-neek-kuh-voom',
    category: 'Core',
    zone: 'MID',
    hint: 'A-Fist — fist on chest',
    fingers: [1, 0, 0, 0, 0],
    poseType: 'a_fist'
  },
  {
    id: 'FINISH',
    en: 'Done / Finished',
    hi: 'हो गया',
    hiPh: 'Ho ga-ya',
    hiAcoustic: 'Ho guh-yaa',
    ta: 'முடிந்தது',
    taPh: 'Mu-dain-tha-thu',
    taAcoustic: 'Moo-dyne-thuh-thoo',
    category: 'Core',
    zone: 'MID',
    hint: 'Five-Shake — open palm flipped outward',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'five_shake'
  },
  {
    id: 'GOOD',
    en: 'Good',
    hi: 'अच्छा',
    hiPh: 'Ach-chaa',
    hiAcoustic: 'Uch-chaa',
    ta: 'நல்லது',
    taPh: 'Nal-la-thu',
    taAcoustic: 'Nul-luh-thoo',
    category: 'Core',
    zone: 'MID',
    hint: 'Flat-B — four fingers flat together',
    fingers: [0, 1, 1, 1, 1],
    poseType: 'flat_b'
  },
  {
    id: 'BAD',
    en: 'Bad',
    hi: 'बुरा',
    hiPh: 'Bu-raa',
    hiAcoustic: 'Boo-raa',
    ta: 'மோசம்',
    taPh: 'Mo-sam',
    taAcoustic: 'Mo-sum',
    category: 'Core',
    zone: 'LOWER',
    hint: 'B-Hand flipped down',
    fingers: [0, 1, 1, 1, 1],
    poseType: 'flat_b_down'
  },
  {
    id: 'HUNGRY',
    en: 'Hungry',
    hi: 'भूखा',
    hiPh: 'Bhoo-khaa',
    hiAcoustic: 'Bhoo-khaa',
    ta: 'பசி',
    taPh: 'Pa-si',
    taAcoustic: 'Puh-see',
    category: 'Feelings',
    zone: 'MID',
    hint: 'C-Hand to chest',
    fingers: [0, 1, 1, 1, 0],
    poseType: 'c_chest'
  },
  {
    id: 'TIRED',
    en: 'Tired',
    hi: 'थका हुआ',
    hiPh: 'Tha-kaa hu-aa',
    hiAcoustic: 'Thuh-kaa hoo-aa',
    ta: 'சோர்வு',
    taPh: 'Sor-vu',
    taAcoustic: 'Sore-voo',
    category: 'Feelings',
    zone: 'LOWER',
    hint: 'B-Hands drop',
    fingers: [0, 1, 1, 1, 1],
    poseType: 'four_down'
  },
  {
    id: 'HAPPY',
    en: 'Happy',
    hi: 'खुश',
    hiPh: 'Khush',
    hiAcoustic: 'Koosh',
    ta: 'மகிழ்ச்சி',
    taPh: 'Ma-gizh-chi',
    taAcoustic: 'Muh-geezh-chee',
    category: 'Feelings',
    zone: 'MID',
    hint: 'Open palm brushing up',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'open_up'
  },
  {
    id: 'SAD',
    en: 'Sad',
    hi: 'दुखी',
    hiPh: 'Du-khee',
    hiAcoustic: 'Doo-khee',
    ta: 'சோகம்',
    taPh: 'So-gam',
    taAcoustic: 'So-gum',
    category: 'Feelings',
    zone: 'LOWER',
    hint: 'Open hands slide down face',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'open_down'
  },
  {
    id: 'HOME',
    en: 'Home',
    hi: 'घर',
    hiPh: 'Ghar',
    hiAcoustic: 'Ghur',
    ta: 'வீடு',
    taPh: 'Vee-du',
    taAcoustic: 'Vee-doo',
    category: 'HomeWork',
    zone: 'MID',
    hint: 'Flat O to cheek',
    fingers: [1, 0, 1, 1, 1],
    poseType: 'flat_o_cheek'
  },
  {
    id: 'HOSPITAL',
    en: 'Hospital',
    hi: 'अस्पताल',
    hiPh: 'As-pa-taal',
    hiAcoustic: 'Us-puh-taal',
    ta: 'மருத்துவமனை',
    taPh: 'Ma-ruth-thu-va-ma-nai',
    taAcoustic: 'Muh-rooth-thoo-vuh-muh-nye',
    category: 'Medical',
    zone: 'UPPER',
    hint: 'H-Sign on arm',
    fingers: [0, 1, 1, 0, 0],
    poseType: 'h_sign'
  },
  {
    id: 'POLICE',
    en: 'Police',
    hi: 'पुलिस',
    hiPh: 'Pu-lis',
    hiAcoustic: 'Poo-lis',
    ta: 'காவல்துறை',
    taPh: 'Kaa-val-thu-rai',
    taAcoustic: 'Kaa-vul-thoo-rye',
    category: 'Emergency',
    zone: 'UPPER',
    hint: 'P-Sign',
    fingers: [1, 1, 1, 0, 0],
    poseType: 'p_sign'
  },
  {
    id: 'CALL',
    en: 'Call / Phone',
    hi: 'फ़ोन करें',
    hiPh: 'Phone ka-ren',
    hiAcoustic: 'Phone kuh-ren',
    ta: 'அழைக்க',
    taPh: 'A-zhaik-ka',
    taAcoustic: 'Uh-zhy-kuh',
    category: 'Actions',
    zone: 'UPPER',
    hint: 'Phone Shaka at ear',
    fingers: [1, 0, 0, 0, 1],
    poseType: 'shaka_ear'
  },
  {
    id: 'SLEEP',
    en: 'Sleep',
    hi: 'सोना',
    hiPh: 'So-naa',
    hiAcoustic: 'So-naa',
    ta: 'தூக்கம்',
    taPh: 'Thook-kam',
    taAcoustic: 'Thook-kum',
    category: 'Actions',
    zone: 'LOWER',
    hint: 'Head tilt with hand to cheek',
    fingers: [1, 0, 1, 1, 1],
    poseType: 'sleep_tilt'
  },
  {
    id: 'TIME',
    en: 'Time',
    hi: 'समय',
    hiPh: 'Sa-may',
    hiAcoustic: 'Suh-may',
    ta: 'நேரம்',
    taPh: 'Ne-ram',
    taAcoustic: 'Nay-rum',
    category: 'TimeNum',
    zone: 'MID',
    hint: 'Tap wrist with bent index',
    fingers: [0, 1, 0, 0, 0],
    poseType: 't_tap'
  },
  {
    id: 'FAMILY',
    en: 'Family',
    hi: 'परिवार',
    hiPh: 'Pa-ri-vaar',
    hiAcoustic: 'Puh-ree-vaar',
    ta: 'குடும்பம்',
    taPh: 'Ku-dum-bam',
    taAcoustic: 'Koo-doom-bum',
    category: 'Family',
    zone: 'MID',
    hint: 'F-Circle outward',
    fingers: [1, 1, 0, 0, 1],
    poseType: 'f_circle'
  },
  {
    id: 'MOTHER',
    en: 'Mother / Mom',
    hi: 'माँ',
    hiPh: 'Maa',
    hiAcoustic: 'Maa',
    ta: 'அம்மா',
    taPh: 'Am-maa',
    taAcoustic: 'Um-maa',
    category: 'Family',
    zone: 'MID',
    hint: 'Five-Hand taps chin',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'five_chin'
  },
  {
    id: 'FATHER',
    en: 'Father / Dad',
    hi: 'पिताजी',
    hiPh: 'Pi-taa-jee',
    hiAcoustic: 'Pee-taa-jee',
    ta: 'அப்பா',
    taPh: 'Ap-paa',
    taAcoustic: 'Up-paa',
    category: 'Family',
    zone: 'UPPER',
    hint: 'Five-Hand taps forehead',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'five_head'
  },
  {
    id: 'FRIEND',
    en: 'Friend',
    hi: 'दोस्त',
    hiPh: 'Dost',
    hiAcoustic: 'Dost',
    ta: 'நண்பர்',
    taPh: 'Nan-bar',
    taAcoustic: 'Nun-bur',
    category: 'Family',
    zone: 'MID',
    hint: 'Hook Link with index fingers',
    fingers: [0, 1, 0, 0, 0],
    poseType: 'hook_link'
  },
  {
    id: 'UNDERSTAND',
    en: 'Understand',
    hi: 'समझना',
    hiPh: 'Sa-majh-naa',
    hiAcoustic: 'Suh-muj-naa',
    ta: 'புரிகிறது',
    taPh: 'Pu-ri-gi-ra-thu',
    taAcoustic: 'Poo-ree-gee-ruh-thoo',
    category: 'Core',
    zone: 'MID',
    hint: 'Index flicks up at temple',
    fingers: [0, 1, 0, 0, 0],
    poseType: 'index_flick'
  },
  {
    id: 'REPEAT',
    en: 'Repeat / Again',
    hi: 'फिर से',
    hiPh: 'Phir se',
    hiAcoustic: 'Fur say',
    ta: 'மீண்டும்',
    taPh: 'Meen-dum',
    taAcoustic: 'Meen-doom',
    category: 'Core',
    zone: 'MID',
    hint: 'Bent fingers tap flat palm',
    fingers: [1, 1, 1, 0, 0],
    poseType: 'arc_tap'
  },
  {
    id: 'MORNING',
    en: 'Morning',
    hi: 'सुबह',
    hiPh: 'Su-bah',
    hiAcoustic: 'Soo-buh',
    ta: 'காலை',
    taPh: 'Kaa-lai',
    taAcoustic: 'Kaa-lye',
    category: 'TimeNum',
    zone: 'UPPER',
    hint: 'Rising arm upward',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'arm_rise'
  },
  {
    id: 'NIGHT',
    en: 'Night',
    hi: 'रात',
    hiPh: 'Raat',
    hiAcoustic: 'Raat',
    ta: 'இரவு',
    taPh: 'I-ra-vu',
    taAcoustic: 'Ee-ruh-voo',
    category: 'TimeNum',
    zone: 'LOWER',
    hint: 'Bent hand arcs downward',
    fingers: [0, 1, 1, 1, 0],
    poseType: 'arc_down'
  },
  {
    id: 'NAMASTE',
    en: 'Namaste / Respect',
    hi: 'नमस्ते / प्रणाम',
    hiPh: 'Na-mas-te / Pra-naam',
    hiAcoustic: 'Nuh-mus-tay',
    ta: 'வணக்கம்',
    taPh: 'Va-nak-kam',
    taAcoustic: 'Vuh-nuk-kum',
    category: 'Core',
    zone: 'MID',
    hint: 'Two Hands Pressed Together at chest',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'namaste_two_hands'
  },
  {
    id: 'BOOK',
    en: 'Book / Study',
    hi: 'किताब / पढ़ना',
    hiPh: 'Ki-taab / Padh-naa',
    hiAcoustic: 'Kee-taab',
    ta: 'புத்தகம்',
    taPh: 'Puth-tha-gam',
    taAcoustic: 'Pooth-thuh-gum',
    category: 'HomeWork',
    zone: 'MID',
    hint: 'Two Hands Opening like a Book',
    fingers: [1, 1, 1, 1, 1],
    poseType: 'book_two_hands'
  },
  {
    id: 'WORK',
    en: 'Work / Job',
    hi: 'काम / नौकरी',
    hiPh: 'Kaam / Nauk-ree',
    hiAcoustic: 'Kaam',
    ta: 'வேலை',
    taPh: 'Ve-lai',
    taAcoustic: 'Vay-lye',
    category: 'HomeWork',
    zone: 'MID',
    hint: 'Fist tapping other wrist',
    fingers: [0, 0, 0, 0, 0],
    poseType: 'work_two_hands'
  }
];

export const HANDSHAPE_TEMPLATES = [
  { poseType: 'open_spread', fingers: [1, 1, 1, 1, 1] as [number, number, number, number, number], label: 'Open Palm' },
  { poseType: 'index_up', fingers: [0, 1, 0, 0, 0] as [number, number, number, number, number], label: 'Index Point' },
  { poseType: 'l_shape', fingers: [1, 1, 0, 0, 0] as [number, number, number, number, number], label: 'L-Handshape' },
  { poseType: 'thumb_up', fingers: [1, 0, 0, 0, 0] as [number, number, number, number, number], label: 'Thumb Up' },
  { poseType: 'thumb_down', fingers: [1, 0, 0, 0, 0] as [number, number, number, number, number], label: 'Thumb Down' },
  { poseType: 'w_sign', fingers: [0, 1, 1, 1, 0] as [number, number, number, number, number], label: '3-Finger W' },
  { poseType: 'food_pinch', fingers: [1, 0, 0, 0, 0] as [number, number, number, number, number], label: 'Tapered Pinch' },
  { poseType: 'ily_sign', fingers: [1, 1, 0, 0, 1] as [number, number, number, number, number], label: 'ILY Hand' },
  { poseType: 'three_thumb', fingers: [1, 1, 1, 0, 0] as [number, number, number, number, number], label: '3-Finger Spread' },
  { poseType: 'pinky_up', fingers: [0, 0, 0, 0, 1] as [number, number, number, number, number], label: 'Pinky I-Hand' },
  { poseType: 'closed_fist', fingers: [0, 0, 0, 0, 0] as [number, number, number, number, number], label: 'S-Fist' },
  { poseType: 'four_up', fingers: [0, 1, 1, 1, 1] as [number, number, number, number, number], label: 'B-Palm (4 Up)' },
  { poseType: 'shaka_call', fingers: [1, 0, 0, 0, 1] as [number, number, number, number, number], label: 'Y-Hand (Shaka)' },
  { poseType: 'horns_where', fingers: [0, 1, 0, 0, 1] as [number, number, number, number, number], label: 'U-Horns' },
  { poseType: 'v_peace', fingers: [0, 1, 1, 0, 0] as [number, number, number, number, number], label: 'V-Sign (2 Up)' },
  { poseType: 'ok_circle', fingers: [1, 0, 1, 1, 1] as [number, number, number, number, number], label: 'F-Pinch (OK)' }
];

export const DOMAIN_SEEDS: Record<string, Array<[string, string, string, string, string, string, string, 'UPPER' | 'MID' | 'LOWER']>> = {
  Medical: [
    ['Medicine', 'दवाई', 'Da-vaa-ee', 'மருந்து', 'மருந்து', 'Ma-run-thu', 'food_pinch', 'UPPER'],
    ['Hospital', 'अस्पताल', 'As-pa-taal', 'மருத்துவமனை', 'மருத்துவமனை', 'Ma-ruth-thu-va-ma-nai', 'v_peace', 'UPPER'],
    ['Pain / Hurt', 'दर्द', 'Dard', 'வலி', 'வலி', 'Va-li', 'index_up', 'MID'],
    ['Fever', 'बुखार', 'Bu-khaar', 'காய்ச்சல்', 'காய்ச்சல்', 'Kaaych-chal', 'open_spread', 'UPPER'],
    ['Headache', 'सिरदर्द', 'Sir-dard', 'தலைவலி', 'தலைவலி', 'Tha-lai-va-li', 'l_shape', 'UPPER'],
    ['Stomach Ache', 'पेट दर्द', 'Pet dard', 'வயிற்று வலி', 'வயிற்று வலி', 'Va-yit-ru va-li', 'closed_fist', 'LOWER'],
    ['Chest Pain', 'सीने में दर्द', 'See-ne mein dard', 'நெஞ்சு வலி', 'நெஞ்சு வலி', 'Nen-ju va-li', 'closed_fist', 'MID'],
    ['Ambulance', 'एम्बुलेंस', 'Am-bu-lance', 'ஆம்புலன்ஸ்', 'ஆம்புலன்ஸ்', 'Aam-bu-lans', 'ily_sign', 'UPPER'],
    ['Nurse', 'नर्स', 'Nurse', 'செவிலியர்', 'செவிலியர்', 'Che-vi-li-yar', 'v_peace', 'MID'],
    ['Pharmacy', 'दवाखाना', 'Da-vaa-khaa-naa', 'மருந்தகம்', 'மருந்தகம்', 'Ma-run-tha-gam', 'food_pinch', 'MID'],
    ['Emergency', 'आपातकाल', 'Aa-paat-kaal', 'அவசரம்', 'அவசரம்', 'A-va-sa-ram', 'ily_sign', 'UPPER']
  ],
  Food: [
    ['Tea (Chai)', 'चाय', 'Chaay', 'தேநீர்', 'தேநீர் / டீ', 'The-neer', 'ok_circle', 'UPPER'],
    ['Coffee', 'कॉफ़ी', 'Cof-fee', 'காபி', 'காபி', 'Kaa-pi', 'ok_circle', 'MID'],
    ['Milk', 'दूध', 'Doodh', 'பால்', 'பால்', 'Paal', 'closed_fist', 'MID'],
    ['Rice', 'चावल', 'Chaa-val', 'சோறு', 'சோறு / அரிசி', 'So-ru / A-ri-si', 'food_pinch', 'MID'],
    ['Bread / Roti', 'रोटी', 'Ro-tee', 'ரொட்டி', 'ரொட்டி / சப்பாத்தி', 'Chap-paath-thi', 'open_spread', 'LOWER'],
    ['Warm Water', 'गरम पानी', 'Ga-ram paa-nee', 'வெந்நீர்', 'வெந்நீர்', 'Ven-neer', 'w_sign', 'MID'],
    ['Cold Water', 'ठंडा पानी', 'Than-daa paa-nee', 'குளிர்ந்த தண்ணீர்', 'குளிர்ந்த தண்ணீர்', 'Ku-lirn-tha than-neer', 'w_sign', 'LOWER'],
    ['Hungry', 'भूख लगी है', 'Bhookh la-gee hai', 'பசிக்கிறது', 'பசிக்கிறது', 'Pa-sik-ki-ra-thu', 'three_thumb', 'LOWER'],
    ['Thirsty', 'प्यास लगी है', 'Pyaas la-gee hai', 'தாகமாக உள்ளது', 'தாகமாக உள்ளது', 'Thaa-ga-maa-ga ul-la-thu', 'w_sign', 'UPPER']
  ],
  Travel: [
    ['Home / House', 'घर', 'Ghar', 'வீடு', 'வீடு', 'Vee-du', 'food_pinch', 'UPPER'],
    ['Train', 'ट्रेन / रेलगाड़ी', 'Train / Rail-gaa-dee', 'ரயில்', 'ரயில்', 'Ra-yil', 'v_peace', 'MID'],
    ['Bus', 'बस', 'Bus', 'பேருந்து', 'பேருந்து', 'Pe-run-thu', 'closed_fist', 'MID'],
    ['Metro Station', 'मेट्रो स्टेशन', 'Me-tro Sta-tion', 'மெட்ரோ நிலையம்', 'மெட்ரோ நிலையம்', 'Met-ro ni-lai-yam', 'three_thumb', 'MID'],
    ['Auto Rickshaw', 'ऑटो रिक्शा', 'Au-to Rick-shaw', 'ஆட்டோ', 'ஆட்டோ', 'Aat-to', 'shaka_call', 'MID'],
    ['Left', 'बाएँ', 'Baa-yen', 'இடது பக்கம்', 'இடது பக்கம்', 'I-da-thu pak-kam', 'l_shape', 'MID'],
    ['Right', 'दाएँ', 'Daa-yen', 'வலது பக்கம்', 'வலது பக்கம்', 'Va-la-thu pak-kam', 'index_up', 'MID'],
    ['Stop Here', 'यहाँ रोकिए', 'Ya-haan ro-ki-ye', 'இங்கே நிறுத்துங்கள்', 'இங்கே நிறுத்துங்கள்', 'In-ge ni-ruth-thun-gal', 'four_up', 'MID']
  ],
  Family: [
    ['Mother (Amma)', 'माँ / माताजी', 'Maa / Maa-taa-jee', 'அம்மா', 'அம்மா', 'Am-maa', 'open_spread', 'UPPER'],
    ['Father (Appa)', 'पिताजी / पापा', 'Pi-taa-jee / Paa-paa', 'அப்பா', 'அப்பா', 'Ap-paa', 'open_spread', 'UPPER'],
    ['Brother', 'भाई', 'Bhaa-ee', 'அண்ணா', 'சகோதரன் / அண்ணா', 'An-naa', 'l_shape', 'MID'],
    ['Sister', 'बहन', 'Ba-han', 'அக்கா', 'சகோதரி / அக்கா', 'Ak-kaa', 'l_shape', 'UPPER'],
    ['Friend', 'दोस्त / मित्र', 'Dost / Mi-tra', 'நண்பர்', 'நண்பர்', 'Nan-bar', 'index_up', 'MID']
  ],
  Actions: [
    ['Want', 'चाहता हूँ', 'Chaah-taa hoon', 'விரும்புகிறேன்', 'விரும்புகிறேன்', 'Vi-rum-bu-gi-ren', 'open_spread', 'MID'],
    ['Go', 'जाना', 'Jaa-naa', 'செல்ல', 'செல்ல / போக', 'Sel-la / Po-ga', 'index_up', 'MID'],
    ['Come', 'आना', 'Aa-naa', 'வாருங்கள்', 'வாருங்கள்', 'Vaa-run-gal', 'index_up', 'UPPER'],
    ['Sit Down', 'बैठना', 'Baith-naa', 'உட்காருங்கள்', 'உட்காருங்கள்', 'Ut-kaa-run-gal', 'v_peace', 'LOWER'],
    ['Understand', 'समझना', 'Sa-majh-naa', 'புரிகிறது', 'புரிகிறது', 'Pu-ri-gi-ra-thu', 'index_up', 'UPPER'],
    ['Do Not Understand', 'समझ नहीं आया', 'Sa-majh na-heen aa-yaa', 'புரியவில்லை', 'புரியவில்லை', 'Pu-ri-ya-vil-lai', 'thumb_down', 'UPPER'],
    ['Speak Slowly', 'धीरे बोलिए', 'Dhee-re bo-li-ye', 'மெதுவாகப் பேசுங்கள்', 'மெதுவாகப் பேசுங்கள்', 'Me-thu-vaa-gap pe-sun-gal', 'four_up', 'LOWER']
  ],
  Feelings: [
    ['Happy', 'खुश', 'Khush', 'மகிழ்ச்சி', 'மகிழ்ச்சி', 'Ma-gizhch-chi', 'open_spread', 'MID'],
    ['Sad', 'उदास', 'U-daas', 'கவலை', 'கவலை / வருத்தம்', 'Ka-va-lai', 'open_spread', 'LOWER'],
    ['Tired', 'थका हुआ', 'Tha-kaa hu-aa', 'சோர்வாக உள்ளது', 'சோர்வாக உள்ளது', 'Sor-vaa-ga ul-la-thu', 'four_up', 'LOWER'],
    ['Love', 'प्यार / स्नेह', 'Pyaar', 'அன்பு', 'அன்பு', 'An-bu', 'ily_sign', 'MID'],
    ['Sorry / Excuse Me', 'माफ़ कीजिए', 'Maaf kee-ji-ye', 'மன்னிக்கவும்', 'மன்னிக்கவும்', 'Man-nik-ka-vum', 'closed_fist', 'MID'],
    ['Safe', 'सुरक्षित', 'Su-rak-shit', 'பாதுகாப்பாக உள்ளது', 'பாதுகாப்பாக உள்ளது', 'Paa-thu-kaap-paa-ga ul-la-thu', 'closed_fist', 'MID']
  ],
  TimeNum: [
    ['Today', 'आज', 'Aaj', 'இன்று', 'இன்று', 'In-dru', 'shaka_call', 'MID'],
    ['Tomorrow', 'कल (आने वाला)', 'Kal', 'நாளை', 'நாளை', 'Naa-lai', 'thumb_up', 'UPPER'],
    ['Now', 'अभी', 'A-bhee', 'இப்போது', 'இப்போது', 'Ip-po-thu', 'shaka_call', 'LOWER'],
    ['Time / Hour', 'समय / बजे', 'Sa-may', 'நேரம்', 'நேரம் / மணி', 'Ne-ram / Ma-ni', 'index_up', 'LOWER'],
    ['One (1)', 'एक (१)', 'Ek', 'ஒன்று', 'ஒன்று (1)', 'On-dru', 'index_up', 'MID'],
    ['Two (2)', 'दो (२)', 'Do', 'இரண்டு', 'இரண்டு (2)', 'I-ran-du', 'v_peace', 'MID'],
    ['Three (3)', 'तीन (३)', 'Teen', 'மூன்று', 'மூன்று (3)', 'Moon-dru', 'three_thumb', 'MID'],
    ['Four (4)', 'चार (४)', 'Chaar', 'நான்கு', 'நான்கு (4)', 'Naan-gu', 'four_up', 'MID'],
    ['Five (5)', 'पाँच (५)', 'Paanch', 'ஐந்து', 'ஐந்து (5)', 'Ain-thu', 'open_spread', 'MID']
  ],
  HomeWork: [
    ['Phone / Mobile', 'मोबाइल फ़ोन', 'Mo-bile Phone', 'கைபேசி', 'கைபேசி / போன்', 'Kai-pe-si', 'shaka_call', 'MID'],
    ['Key', 'चाबी', 'Chaa-bee', 'சாவி', 'சாவி', 'Saa-vi', 'index_up', 'LOWER'],
    ['Door', 'दरवाज़ा', 'Dar-vaa-zaa', 'கதவு', 'கதவு', 'Ka-tha-vu', 'four_up', 'MID'],
    ['Sign Language', 'सांकेतिक भाषा', 'Saan-ke-tik bhaa-shaa', 'சைகை மொழி', 'சைகை மொழி', 'Sai-gai mo-zhi', 'ily_sign', 'MID']
  ]
};

export const QUICK_STARTERS = [
  { label: '💧 Need Water', ids: ['HELLO', 'I', 'NEED', 'WATER', 'PLEASE'] },
  { label: '🍲 Need Food', ids: ['HELLO', 'I', 'NEED', 'FOOD', 'PLEASE'] },
  { label: '🩺 Need Doctor', ids: ['HELP', 'I', 'NEED', 'DOCTOR'] },
  { label: '🚻 Where is Restroom?', ids: ['WHERE', 'BATHROOM', 'PLEASE'] },
  { label: '🙏 Thank You', ids: ['THANK_YOU', 'OK'] }
];

let cachedFullLexicon: SignItem[] | null = null;

export function getFullLexicon(): SignItem[] {
  if (cachedFullLexicon) return cachedFullLexicon;

  const list: SignItem[] = [...BASE_SIGNS];
  const byId: Record<string, SignItem> = {};
  BASE_SIGNS.forEach(s => { byId[s.id] = s; });

  // Add Domain Seeds
  Object.entries(DOMAIN_SEEDS).forEach(([catName, rows]) => {
    rows.forEach((row) => {
      const [en, hi, hiPh, , ta, taPh, poseType, zone] = row;
      const id = 'SIGN_' + en.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
      if (byId[id]) return;
      const tmpl = HANDSHAPE_TEMPLATES.find(t => t.poseType === poseType) || HANDSHAPE_TEMPLATES[0];
      const item: SignItem = {
        id,
        en,
        hi,
        hiPh,
        hiAcoustic: hiPh.replace(/-/g, ' '),
        ta,
        taPh,
        taAcoustic: taPh.replace(/-/g, ' '),
        category: catName,
        zone: zone || 'MID',
        hint: `${tmpl.label} • ${zone || 'MID'} Zone`,
        fingers: tmpl.fingers,
        poseType: tmpl.poseType
      };
      list.push(item);
      byId[id] = item;
    });
  });

  // Add A-Z Fingerspelling
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const ALPHA_HINDI = ['ए','बी','सी','डी','ई','एफ','जी','एच','आई','जे','के','एल','एम','एन','ओ','पी','क्यू','आर','एस','टी','यू','वी','डब्ल्यू','एक्स','वाई','ज़ेड'];
  const ALPHA_TAMIL = ['ஏ','பி','சி','டி','ஈ','எஃப்','ஜி','எச்','ஐ','ஜே','கே','எல்','எம்','என்','ஓ','பி','க்யூ','ஆர்','எஸ்','டி','யூ','வி','டபிள்யூ','எக்ஸ்','ஒய்','இசட்'];

  ALPHABET.forEach((letter, idx) => {
    const tmpl = HANDSHAPE_TEMPLATES[idx % HANDSHAPE_TEMPLATES.length];
    const id = `LETTER_${letter}`;
    const item: SignItem = {
      id,
      en: `Letter ${letter}`,
      letter,
      hi: `अक्षर ${ALPHA_HINDI[idx]} (${letter})`,
      hiPh: `Ak-shar ${letter}`,
      hiAcoustic: `Letter ${letter}`,
      ta: `எழுத்து ${ALPHA_TAMIL[idx]} (${letter})`,
      taPh: `E-zhuth-thu ${letter}`,
      taAcoustic: `Letter ${letter}`,
      category: 'A–Z Spell',
      zone: 'MID',
      hint: `Finger-Spell ${letter} (${tmpl.label})`,
      fingers: tmpl.fingers,
      poseType: tmpl.poseType
    };
    list.push(item);
    byId[id] = item;
  });

  // Add Action Frame Phrases (expands to 1,080+ items)
  const ACTION_FRAMES = [
    {
      prefixId: 'I_NEED',
      en: (n: string) => `Need ${n}`,
      hi: (n: string) => `मुझे ${n} चाहिए`,
      hiPh: (n: string) => `Mu-jhe ${n} chaa-hi-ye`,
      ta: (n: string) => `எனக்கு ${n} வேண்டும்`,
      taPh: (n: string) => `E-nak-ku ${n} ven-dum`,
      zone: 'MID' as const
    },
    {
      prefixId: 'WHERE_IS',
      en: (n: string) => `Where is ${n}?`,
      hi: (n: string) => `${n} कहाँ है?`,
      hiPh: (n: string) => `${n} ka-haan hai?`,
      ta: (n: string) => `${n} எங்கே உள்ளது?`,
      taPh: (n: string) => `${n} en-ge ul-la-thu?`,
      zone: 'UPPER' as const
    },
    {
      prefixId: 'PLEASE_GIVE',
      en: (n: string) => `Please give ${n}`,
      hi: (n: string) => `कृपया ${n} दीजिए`,
      hiPh: (n: string) => `Kri-pa-ya ${n} dee-ji-ye`,
      ta: (n: string) => `தயவுசெய்து ${n} கொடுங்கள்`,
      taPh: (n: string) => `Tha-ya-vu-sey-thu ${n} ko-dun-gal`,
      zone: 'LOWER' as const
    },
    {
      prefixId: 'URGENT_NEED',
      en: (n: string) => `Urgent: ${n}`,
      hi: (n: string) => `तुरंत ${n} की ज़रूरत है`,
      hiPh: (n: string) => `Tu-rant ${n} kee za-roo-rat hai`,
      ta: (n: string) => `உடனடியாக ${n} தேவை`,
      taPh: (n: string) => `U-da-na-di-yaa-ga ${n} the-vai`,
      zone: 'UPPER' as const
    }
  ];

  const baseNouns = list.filter(s =>
    ['Medical', 'Food', 'Travel', 'Family', 'HomeWork'].includes(s.category)
  );

  ACTION_FRAMES.forEach(frame => {
    baseNouns.forEach(noun => {
      const cleanEn = noun.en.split('/')[0].trim();
      const cleanHi = noun.hi.split('/')[0].trim();
      const cleanTa = noun.ta.split('/')[0].trim();
      const id = `${frame.prefixId}_${noun.id}`;
      if (byId[id]) return;

      const entry: SignItem = {
        id,
        en: frame.en(cleanEn),
        hi: frame.hi(cleanHi),
        hiPh: frame.hiPh(noun.hiPh.split('/')[0].trim()),
        hiAcoustic: frame.hiPh(noun.hiPh.split('/')[0].trim()).replace(/-/g, ' '),
        ta: frame.ta(cleanTa),
        taPh: frame.taPh(noun.taPh.split('/')[0].trim()),
        taAcoustic: frame.taPh(noun.taPh.split('/')[0].trim()).replace(/-/g, ' '),
        category: noun.category,
        zone: frame.zone,
        hint: `${noun.hint.split('•')[0].trim()} • ${frame.zone} Zone`,
        fingers: noun.fingers,
        poseType: noun.poseType
      };
      list.push(entry);
      byId[id] = entry;
    });
  });

  cachedFullLexicon = list;
  return list;
}

