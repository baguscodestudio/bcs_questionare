import DefaultCard from '@/components/defaultcard';
import { Button } from '@/components/ui/button';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { cn } from '@/lib/utils';
import { locale } from '@/store/locale';
import { fetchNui } from '@/utils/fetchNui';
import { CircleCheck, CircleX } from 'lucide-react';
import { useState } from 'react';

const Finish = () => {
	const [data, setData] = useState({
		success: true,
		result: 0,
		min: 2,
		max: 10,
		description: 'You made it through, now you can take the practical exam',
	});

	useNuiEvent('setFinish', setData);

	return (
		<DefaultCard className={data.success ? 'blue-gradient' : 'red-gradient'}>
			{data.success ? (
				<CircleCheck size={160} className="text-accent" />
			) : (
				<CircleX size={160} className="text-destructive" />
			)}
			<div
				className={cn(
					data.success ? 'text-accent' : 'text-destructive',
					'text-2xl mt-4 font-bold'
				)}
			>
				{data.success ? 'SUCCESS' : 'FAILED'}
			</div>
			<div className="text-xl mt-4">
				{locale['your_result']}: {data.result} / {data.max} (
				{locale['min_required']}: {data.min})
			</div>
			<p className="mt-4">{data.description}</p>
			<Button
				onClick={() => fetchNui('closeTest', data)}
				variant={data.success ? 'accent-outline' : 'destructive-outline'}
				className="w-96 mt-11"
			>
				{locale['close']}
			</Button>
		</DefaultCard>
	);
};

export default Finish;
