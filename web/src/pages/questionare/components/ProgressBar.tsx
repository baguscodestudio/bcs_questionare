const ProgressBar = ({ no, max }: { no: number; max: number }) => {
	return (
		<div className="w-full h-[6px] rounded-full relative bg-muted">
			<div
				className="bg-accent h-full rounded-full transition-transform"
				style={{ width: (no / max) * 100 + '%' }}
			></div>
		</div>
	);
};

export default ProgressBar;
