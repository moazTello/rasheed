import { FaPaintBrush } from 'react-icons/fa';
import { useState } from 'react';

const OpenionDetailsTable = ({ data }) => {
  const [tableColor, setTableColor] = useState(true);
  if (!data || typeof data !== 'object') {
    return <div>No valid data available</div>;
  }
  const opinionEntries = Object.entries(data).filter(([key]) => key.startsWith('q'));
  const questions = [
    { key: 'q1', text: 'المعلومات المقدمة من المنظمة حول المشروع وأنشطته وأهدافه واضحة وسهلة الفهم' },
    { key: 'q2', text: 'الأهداف المحددة للمشروع والأثر المتوقع على المجتمع واضحة ومفهومة، ومتاحة لأفراد المجتمع المحلي في المناطق المستفيدة من المشروع' },
    { key: 'q3', text: 'ساهمت ممارسات الشفافية التي قامت بها المنظمة في مرحلة التحضير بتعزيز استجابة ومشاركة أفراد المجتمع المحلي' },
    { key: 'q4', text: 'ساهمت ممارسات الشفافية التي قامت بها المنظمة في مرحلة التحضير بتعزيز مشاركة النساء والنساء الأشد ضعفاً' },
    { key: 'q5', text: 'أعتقد أن المشروع وفر فرص مشاركة عادلة للنازحين والعائدين' },
    { key: 'q6', text: 'أعتقد أن المشروع وفر فرص مشاركة عادلة للأشخاص ذوي الإعاقة' },
    { key: 'q7', text: 'أعتقد أن المشروع وفر فرص عادلة لمشاركة أفراد المجتمع المحلي من القبائل المختلفة في مناطق تنفيذ المشروع' },
    { key: 'q8', text: 'أعتقد أن المشروع وفر فرص عادلة لمشاركة أفراد المجتمع المحلي من المناطق المختلفة المستفيدة من المشروع' },
    { key: 'q9', text: 'تقوم المنظمة بالرد على استفسارات أفراد المجتمع المحلي في الوقت المناسب' },
    { key: 'q10', text: 'تقوم المنظمة بمشاركة تقارير مختصرة عبر وسائل التواصل الاجتماعي مع أفراد المجتمع المحلي لتوضح النتائج التي تم تحقيقها في الأنشطة بشكل شفاف ومفهوم' },
    { key: 'q11', text: 'أعتقد أن التقارير المختصرة التي قامت المنظمة بمشاركتها تعكس نتائج شفافة وواقعية' },
    { key: 'q12', text: 'تقوم المنظمة بالإفصاح عن التحديات والعراقيل التي تواجه المشروع وكيفية التعامل معها بشكل شفاف' },
    { key: 'q13', text: 'آليات الشكاوى التي توفرها المنظمة سهلة الاستخدام لجميع فئات المجتمع بما في ذلك النساء والنساء الأشد ضعفاً، والنازحين والعائدين، والأشخاص ذوي الإعاقة' },
    { key: 'q14', text: 'آليات الشكاوى التي توفرها المنظمة مُيسرة وسهلة الوصول لجميع فئات المجتمع بما في ذلك النساء والنساء الأشد ضعفاً، والنازحين والعائدين، والأشخاص ذوي الإعاقة' },
    { key: 'q15', text: 'المنظمة تستجيب بسرعة للشكاوى المقدمة من أفراد المجتمعات المحلية' },
    { key: 'q16', text: 'توفر المنظمة تغذية راجعة للمشتكين حول الشكاوى المقدمة' },
    { key: 'q17', text: 'تقوم المنظمة بتوفير أدوات ووسائل مُيسرة وسهلة الوصول تتيح لأفراد المجتمعات المحلية تقديم الملاحظات والتوصيات' },
    { key: 'q18', text: 'أدوات وقنوات تقديم الملاحظات والتوصيات التي توفرها المنظمة سهلة الاستخدام لجميع فئات المجتمع بما في ذلك النساء والنساء الأشد ضعفاً، والنازحين والعائدين، والأشخاص ذوي الإعاقة' },
    { key: 'q19', text: 'المنظمة تقوم بالاستجابة للملاحظات والتوصيات المقدمة من قبل أفراد المجتمع المحلي وتقوم بتحسين الأنشطة بناءًً عليها' },
    { key: 'q20', text: 'تقوم المنظمة بتوعية أفراد المجتمعات المحلية حول المساحات والأنشطة والقنوات التي يمكن استخدامها لتقديم الملاحظات والتوصيات حول الأنشطة المنفذة' },
  ];

  return (
    <div className="overflow-auto rounded-lg h-fit max-h-[70vh] no-scrollbar">
      <table className="table w-full">
        <thead>
          <tr
            className={`${
              tableColor
                ? 'bg-stone-900 bg-opacity-75 text-sm text-white w-full'
                : 'bg-slate-50 w-full text-sm text-primary'
            }`}
          >
            <th className="p-4">الرأي</th>
            <th className="p-4">المؤشر</th>
            <th className="p-4">
              <button onClick={() => setTableColor((old) => !old)}>
                <FaPaintBrush size={16} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {opinionEntries.map(([key, value], index) => {
            const question = questions.find((q) => q.key === key);
            return (
              <tr
                key={index}
                className={`${
                  tableColor
                    ? 'bg-stone-900 bg-opacity-25 text-white w-full hover:bg-stone-800 text-sm border-t-2 border-[#21172e]'
                    : 'bg-slate-50 w-full text-sm text-primary hover:bg-slate-100 border-t-2 border-[#e8e9e9]'
                }`}
              >
                <td className="px-2 text-center min-w-56">{value}</td>
                <td className="px-2 text-center min-w-96">{question?.text || 'غير متوفر'}</td>
                <td className="p-4 text-center">{index+1}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OpenionDetailsTable;
