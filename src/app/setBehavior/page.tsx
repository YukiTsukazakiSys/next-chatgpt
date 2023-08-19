'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { promptMsgAtom } from '@/atom/countAtom';

const Page = () => {
  const router = useRouter();
  const setPromptMsg: SetterOrUpdater<string> = useSetRecoilState(promptMsgAtom);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
  } = useForm({
    defaultValues: { prompt: '' },
    criteriaMode: 'all',
    mode: 'onChange',
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>プロンプト入力画面</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(() => {})}>
        <div className={styles.prompt}>
          <input
            id="prompt"
            className={styles.promptInput}
            placeholder=" "
            {...register('prompt', {
              required: {
                value: true,
                message: '入力必須です！',
              },
              maxLength: {
                value: 50,
                message: '50文字以内で入力してください！',
              },
            })}
          />
          <label htmlFor="prompt" className={styles.promptLabel}>
            promptを入力
          </label>
        </div>
        {errors.prompt?.types?.required && (
          <div className={styles.errorMsg}>{errors.prompt.types.required}</div>
        )}
        {errors.prompt?.types?.maxLength && (
          <div className={styles.errorMsg}>{errors.prompt.types.maxLength}</div>
        )}
        {isValid ? (
          <Link
            href="/chat"
            className={styles.startBtn}
            onClick={() => setPromptMsg(getValues('prompt'))}
          >
            start!
          </Link>
        ) : (
          <button type="submit" className={styles.startBtn}>
            start!
          </button>
        )}
      </form>
      <button className={styles.backbtn} onClick={() => router.back()}>
        戻る
      </button>
    </div>
  );
};

export default Page;
