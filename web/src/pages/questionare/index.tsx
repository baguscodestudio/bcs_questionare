import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { debugData } from '../../utils/debugData';
import { locale } from '../../store/locale';
import DefaultCard from '../../components/defaultcard';
import { useNavigate } from 'react-router-dom';
import { fetchNui } from '@/utils/fetchNui';
import { useVisibility } from '@/providers/VisibilityProvider';

interface IHomeData {
	title: string;
	subtitle: string;
	description: string;
	image?: string;
	max: number;
}

debugData([
	{
		action: 'setHomeQuestionare',
		data: {
			title: 'DRIVING LICENSE',
			subtitle: 'Motorcycle',
			image: 'images/license.png',
			description:
				'Complete this test to get a driving theory license. This is required for the practical test.',
			max: 20,
		},
	},
]);

const Questionare = () => {
	const [homeData, setHomeData] = useState<IHomeData>();
	const navigate = useNavigate();
	const { visible } = useVisibility();

	useEffect(() => {
		if (!visible) setHomeData(undefined);
		else fetchNui<IHomeData>('getHomeQuestionare').then(setHomeData);
	}, [visible]);

	return (
		<DefaultCard className={cn('blue-gradient py-14 px-20 xl:px-28 gap-6')}>
			<div className="flex flex-col gap-2 items-center">
				<div className="text-2xl font-bold">{homeData?.title}</div>
				<div>{homeData?.subtitle}</div>
			</div>
			{homeData?.image && (
				<img alt="title image" src={homeData.image} className="w-56" />
			)}
			<p className="text-center">{homeData?.description}</p>
			<div className="flex gap-6 mt-4">
				<Button
					variant="outline-accent"
					className="w-32"
					onClick={() => fetchNui('hideFrame')}
				>
					{locale['cancel']}
				</Button>
				<Button
					variant="accent"
					className="w-32"
					onClick={() => navigate(`/question/1?max=${homeData?.max}`)}
				>
					{locale['start']}
				</Button>
			</div>
		</DefaultCard>
	);
};

export default Questionare;
