'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import {
  frequencyPenaltyAtom,
  maxTokensAtom,
  presencePenaltyAtom,
  promptMsgAtom,
  temperatureAtom,
  topPAtom,
} from '@/atom';
import { useState } from 'react';

const radioList1 = ['temperature', 'top_p'];
const radioList2 = ['presence_penalty', 'frequency_penalty'];

const Page = () => {
  const router = useRouter();
  const [showDetailSetting, setShowDetailSetting] = useState(false);
  const setFrequencyPenalty: SetterOrUpdater<number> = useSetRecoilState(frequencyPenaltyAtom);
  const setMaxTokens: SetterOrUpdater<number> = useSetRecoilState(maxTokensAtom);
  const setPresencePenalty: SetterOrUpdater<number> = useSetRecoilState(presencePenaltyAtom);
  const setPromptMsg: SetterOrUpdater<string> = useSetRecoilState(promptMsgAtom);
  const setTemperature: SetterOrUpdater<number> = useSetRecoilState(temperatureAtom);
  const setTopP: SetterOrUpdater<number> = useSetRecoilState(topPAtom);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      prompt: '',
      max_tokens: '',
      probabilityParameterRadio: 0,
      temperature: '',
      top_p: '',
      penaltyRadio: 0,
      presence_penalty: '',
      frequency_penalty: '',
    },
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const setOption = () => {
    setPromptMsg(getValues('prompt'));
    !!getValues('max_tokens') && setMaxTokens(Number(getValues('max_tokens')));
    getValues('probabilityParameterRadio') == 0
      ? !!getValues('temperature') && setTemperature(Number(getValues('temperature')))
      : !!getValues('top_p') && setTopP(Number(getValues('top_p')));
    getValues('penaltyRadio') == 0
      ? !!getValues('presence_penalty') && setPresencePenalty(Number(getValues('presence_penalty')))
      : !!getValues('frequency_penalty') &&
        setFrequencyPenalty(Number(getValues('frequency_penalty')));
  };

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

        {showDetailSetting ? (
          <div className={styles.detailSettingContainer}>
            <div className="w-full py-[30px] px-[10px]">
              <div className={styles.detailSettingInputContainer}>
                <label htmlFor="max_tokens" className="mb-[5px] ml-[5px]">
                  max_tokens
                </label>
                <input
                  id="max_tokens"
                  className={styles.detailSettingInput}
                  placeholder="100"
                  {...register('max_tokens', {})}
                />
              </div>
              <div className="mt-[20px]">
                <div className="ml-[5px] mb-[5px]">
                  {radioList1.map((label: any, index) => (
                    <span key={label}>
                      <input
                        id={label}
                        type="radio"
                        value={index}
                        {...register('probabilityParameterRadio')}
                        defaultChecked={index === 0}
                      />
                      <label htmlFor={label} className="mr-[10px]">
                        {label}
                      </label>
                    </span>
                  ))}
                </div>
                {watch('probabilityParameterRadio') == 0 ? (
                  <div className={styles.detailSettingInputContainer}>
                    <input
                      className={styles.detailSettingInput}
                      placeholder="temperature"
                      {...register('temperature', {})}
                    />
                  </div>
                ) : (
                  <div className={styles.detailSettingInputContainer}>
                    <input
                      className={styles.detailSettingInput}
                      placeholder="top_p"
                      {...register('top_p', {})}
                    />
                  </div>
                )}
              </div>
              <div className="mt-[20px]">
                <div className="ml-[5px] mb-[5px]">
                  {radioList2.map((label, index) => (
                    <span key={label}>
                      <input
                        id={label}
                        type="radio"
                        value={index}
                        {...register('penaltyRadio')}
                        defaultChecked={index === 0}
                      />
                      <label htmlFor={label} className="mr-[10px]">
                        {label}
                      </label>
                    </span>
                  ))}
                </div>
                {watch('penaltyRadio') == 0 ? (
                  <div className={styles.detailSettingInputContainer}>
                    <input
                      className={styles.detailSettingInput}
                      placeholder="presence_penalty"
                      {...register('presence_penalty', {})}
                    />
                  </div>
                ) : (
                  <div className={styles.detailSettingInputContainer}>
                    <input
                      className={styles.detailSettingInput}
                      placeholder="frequency_penalty"
                      {...register('frequency_penalty', {})}
                    />
                  </div>
                )}
              </div>
            </div>
            <button className="mb-[20px]" onClick={() => setShowDetailSetting(false)}>
              詳細設定を閉じる
            </button>
          </div>
        ) : (
          <button className="mt-[30px]" onClick={() => setShowDetailSetting(true)}>
            詳細設定を開く
          </button>
        )}

        {isValid ? (
          <Link href="/chat" className={styles.startBtn} onClick={setOption}>
            start!
          </Link>
        ) : (
          <button type="submit" className={styles.startBtn}>
            start!
          </button>
        )}
      </form>
      <button className="mt-[20px]" onClick={() => router.back()}>
        戻る
      </button>
    </div>
  );
};

export default Page;
