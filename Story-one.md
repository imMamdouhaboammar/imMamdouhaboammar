وأنا شغال على `𝒂𝒈𝒆𝒏𝒕-𝒌𝒆𝒓𝒏𝒆𝒍` حصل موقف خلاني أبص لموضوع الـ𝐅𝐫𝐞𝐬𝐡 𝐒𝐞𝐬𝐬𝐢𝐨𝐧𝐬 بطريقة عملية أكتر

كان عندي PR شغال عليه بقاله فترة، session طويلة عاشت مع الـproblem من أولها، شافت الـfailures، التعديلات، الاختبارات، والقرارات اللي اتغيرت أثناء الشغل

وصلنا في الآخر لـ12 meaningful atomic commits، Ubuntu CI كان green بالكامل على Node 18 و20 و22، الـtypecheck والـbuild والـsmoke checks عدوا، والـWindows failure المتبقي كان معروف ومتسجل في issue منفصلة

يعني لو بصيت على الـsession من جواها، فيه إحساس منطقي جدًا إننا فاهمين الـchange كويس وعارفين إحنا بنعمل إيه
 
بعدها حصل fresh inspection لنفس الـdiff

وطلع لسه فيه حاجات الـworking loop الطويلة ما قفلتهاش، concern حوالين `execFileSync(file, options)` والـconfig propagation، documentation drift في الـcanonical routing، ومعاهم شوية maintainability وsecurity review items خلت الـPR يفضل blocked وقتها بدل ما يتعامل مع الـgreen checks كأنها نهاية الشغل

الـobservation دي وقفتني شوية

لأن الـfresh inspection ما كانش عنده ساعتين من الحوار السابق، ولا كل hypotheses اللي جربناها، ولا كل التعديلات اللي وصلتنا للنسخة الحالية

هو داخل على الحالة الحالية نفسها

وفي نفس الفترة كنت أصلًا ببني في `agent-kernel` حاجات شكلها فجأة بقى منطقي أكتر بالنسبة لي

الـ `SessionStart` عندي مصمم يدخل context حجمه bounded، والـ`file-context` يجيب المعرفة المرتبطة بالملفات اللي الـagent داخل يعدلها بbudget محدد بدل ما نرمي كل اللي نعرفه عن المشروع قدامه كل مرة

ولما رجعت لـ`get-fable` لقيتني واخد الفكرة أبعد من كده من غير ما أسميها بالشكل ده أصلًا

الـSPEC template فيه rule صريحة إن الـwork card الواحدة تفضل في حدود fresh context تقريبًا، حوالي 5 files و300 lines changed، والـPROGRESS template مكتوب فيه حرفيًا إن Fresh Context تقدر ترجع للمشهد بقراءة `SPEC.md` والملف ده فقط، والـhandoff نفسه مبني على فكرة حفظ decision state بدل الاحتفاظ بحجم الـconversation

يعني وأنا ببني الأداتين كنت عمليًا بحاول أخلي الـsession disposable

القرار المهم يعيش في الـrepo
الـacceptance criteria تعيش في الـspec
اللي اتعمل وإثباته يعيش في progress state
الـfailure اللي اتفهم يتسجل كlesson
والـagent الجديد ياخد اللي يحتاجه للتاسك الحالية ويرجع يشتغل

وده قريب جدًا من الطريقة اللي Anthropic نفسها بتشرح بيها Context Engineering حاليًا

Claude Code بيعتبر الـcontext كل حاجة موجودة قدام الـmodel وقت القرار، conversation history، files اتقرت، tool calls وoutputs، وكل ده بيتراكم أثناء الـsession

والـdocumentation الحالية بتقول بوضوح إن الأداء ممكن يتراجع مع امتلاء الـcontext، والـcompaction معمول عشان يلخص history أقدم ويحافظ على مساحة أنضف للشغل الحالي

بس هنا لازم أكون دقيق

اللي حصل في `agent-kernel` observation مفيدة جدًا بالنسبالي، إنما لسه مش controlled A/B experiment

الـfresh inspection كانت review لنفس الـchange، مش إعادة تنفيذ كاملة لنفس التاسك من الصفر تحت نفس الظروف

وعشان كده التجربة اللي عايز أعملها صح المرة الجاية بسيطة جدًا

نفس commit SHA
نفس model
نفس task
نفس acceptance criteria
نفس tools

Run أولى تكمل داخل session اشتغلت ساعتين وشايلة تاريخ التنفيذ كله

Run تانية تبدأ Fresh Session، وأديها بس الـproject instructions والـspec والملفات والevidence اللي تحتاجهم

وبعدين أبص على حاجات أقدر أقارنها فعلًا

اختار يعدل أنهي files
وسع الـscope قد إيه
التزم بالـconventions قد إيه
كرر hypotheses قديمة ولا لأ
احتاج مني كام correction
الـtests كشفت إيه
والـdiff النهائي قرب قد إيه من architecture المشروع الحالية

ساعتها لو الـFresh Session طلعت أحسن عشر مرات، يبقى عندي data أقدر أتكلم عنها

ولو الـLong Session كسبت، برضه النتيجة مهمة، لأن فيه tasks ممكن تكون الـhistory المتراكمة فيها هي اللي مانعة الـagent من إعادة أخطاء قديمة

اللي اتغير عندي حاليًا هو السؤال نفسه

بقيت وأنا فاتح coding agent ما أفكرش هو فاكر قد إيه من الساعتين اللي فاتوا

بفكر هل كل معلومة محتاجها عشان ياخد القرار الحالي موجودة قدامه بشكل واضح، وهل أي decision مهم يقدر يفضل موجود لو قفلت الـsession حالًا وفتحت واحدة جديدة

لو نجاح المشروع معتمد على إن chat معينة تفضل عايشة للأبد، غالبًا عندي project context محتاج يتكتب أحسن


