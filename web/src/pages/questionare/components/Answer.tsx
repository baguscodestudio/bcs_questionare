import { Button } from '../../../components/ui/button';
import { cn } from '../../../lib/utils';

const Answer = ({
	data,
	onClick,
}: {
	data: { id: string; answer?: string; image?: string };
	onClick: (id: string) => void;
}) => {
	return (
		<Button
			onClick={() => onClick(data.id)}
			className={cn(
				'whitespace-normal text-wrap h-full group',
				data.image && 'p-0 overflow-clip'
			)}
		>
			{data.answer}
			{data.image && (
				<img
					src={data.image}
					alt="answer image"
					className="h-full object-cover group-hover:size-11/12 transition-all duration-200"
				/>
			)}
		</Button>
	);
};

export default Answer;
