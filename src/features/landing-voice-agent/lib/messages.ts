export const landingAgentMessages = {
  en: {
    open: 'Talk to MujibAI',
    title: 'MujibAI voice agent',
    description: 'A live public demo — no account or API key required.',
    start: 'Start conversation',
    startAgain: 'Start again',
    end: 'End conversation',
    mute: 'Mute microphone',
    unmute: 'Unmute microphone',
    interrupt: 'Tap to interrupt',
    visualizer: 'Audio visualizer',
    states: {
      idle: 'Ready',
      connecting: 'Connecting',
      listening: 'Listening',
      thinking: 'Thinking',
      speaking: 'Speaking',
      reconnecting: 'Reconnecting',
      ended: 'Conversation ended',
      error: 'Needs attention',
    },
    permission: {
      prompt: 'Microphone access is requested only after you start.',
      granted: 'Microphone access is active.',
      denied:
        'Microphone access was denied. Allow it in browser settings and try again.',
      unsupported: 'This browser does not support live microphone access.',
    },
    transcript: {
      empty: 'Your live conversation will appear here.',
      you: 'You',
      agent: 'MujibAI',
    },
    errors: {
      microphoneDenied: 'We could not access your microphone.',
      unsupported: 'Your browser does not support this voice experience.',
      connection: 'The connection was lost. Please try again.',
      rateLimit: 'The demo is busy right now. Please try again later.',
      sessionLimit: 'This demo conversation has reached its time limit.',
      audio: 'Audio could not be played. Check your browser audio settings.',
      unexpected: 'Something unexpected happened. Please try again.',
      configuration: 'The voice demo is temporarily unavailable.',
    },
  },
  ar: {
    open: 'تحدث مع مُجيب AI',
    title: 'وكيل مُجيب AI الصوتي',
    description: 'تجربة عامة مباشرة، دون حساب أو مفتاح API.',
    start: 'ابدأ المحادثة',
    startAgain: 'ابدأ من جديد',
    end: 'إنهاء المحادثة',
    mute: 'كتم الميكروفون',
    unmute: 'تشغيل الميكروفون',
    interrupt: 'اضغط للمقاطعة',
    visualizer: 'مؤشر الصوت',
    states: {
      idle: 'جاهز',
      connecting: 'جارٍ الاتصال',
      listening: 'يستمع',
      thinking: 'يفكر',
      speaking: 'يتحدث',
      reconnecting: 'إعادة الاتصال',
      ended: 'انتهت المحادثة',
      error: 'يحتاج إلى انتباه',
    },
    permission: {
      prompt: 'سنطلب إذن الميكروفون فقط بعد بدء المحادثة.',
      granted: 'تم تفعيل الميكروفون.',
      denied:
        'تم رفض إذن الميكروفون. اسمح به من إعدادات المتصفح ثم حاول مجددًا.',
      unsupported: 'هذا المتصفح لا يدعم الوصول المباشر إلى الميكروفون.',
    },
    transcript: {
      empty: 'ستظهر محادثتك المباشرة هنا.',
      you: 'أنت',
      agent: 'مُجيب AI',
    },
    errors: {
      microphoneDenied: 'تعذر الوصول إلى الميكروفون.',
      unsupported: 'متصفحك لا يدعم هذه التجربة الصوتية.',
      connection: 'انقطع الاتصال. حاول مجددًا.',
      rateLimit: 'التجربة مشغولة حاليًا. حاول لاحقًا.',
      sessionLimit: 'وصلت هذه المحادثة التجريبية إلى الحد الزمني.',
      audio: 'تعذر تشغيل الصوت. تحقق من إعدادات صوت المتصفح.',
      unexpected: 'حدث خطأ غير متوقع. حاول مجددًا.',
      configuration: 'التجربة الصوتية غير متاحة مؤقتًا.',
    },
  },
} as const;

export function getLandingAgentMessages(locale: string) {
  return locale.startsWith('ar')
    ? landingAgentMessages.ar
    : landingAgentMessages.en;
}
