import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => setMenuOpen(!isMenuOpen);
	const handleClose = () => setMenuOpen(false);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: sidebarRef,
		onClose: handleClose,
		onChange: setMenuOpen,
	});

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBgColorChange = (option: OptionType) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		handleClose();
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBgColorChange}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
