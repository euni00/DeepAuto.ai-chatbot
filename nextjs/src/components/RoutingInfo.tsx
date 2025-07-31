import { IRoutingData } from '@/common/type/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RoutingInfo = ({ routing }: { routing: IRoutingData }) => {
  return (
    <Card className="w-full max-w-xs mb-8 shadow-sm bg-zinc-900 text-zinc-100 border border-zinc-800">
      <CardHeader>
        <CardTitle className="text-sm text-white">✅ Selected Model</CardTitle>
        <p className="text-xs text-zinc-400 break-words">{routing.selected}</p>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium mb-2 text-sm text-white">📊 Candidate Model Scores</h3>
        <div className="space-y-2">
          {routing.grades.map((grade) => (
            <div
              key={grade.model}
              className={`rounded-md p-2 text-xs ${
                grade.model === routing.selected
                  ? 'border border-blue-400 bg-blue-900/20'
                  : 'border border-zinc-700 bg-zinc-800'
              }`}
            >
              <p className="font-semibold text-white">{grade.model}</p>
              <p className="text-zinc-400">
                {grade.gradeLabel} (score: {grade.score.toFixed(2)}, grade: {grade.gradeValue})
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoutingInfo;
