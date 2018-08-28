import { IWidgetData, WidgetSettingsService } from './widget-settings';

import { metadata } from 'components/shared/inputs';
import { $t } from 'services/i18n';


export interface IGoalData extends IWidgetData {
  goal: {
    title: string;
    goal_amount: number;
    current_amount: number;
    to_go: string;
  };
  settings: {
    background_color: string,
    bar_color: string,
    bar_bg_color: string,
    text_color: string,
    bar_text_color: string,
    font: string,
    bar_thickness: string,
    layout: string
    custom_enabled: boolean,
    custom_html: string,
    custom_js: string,
    custom_css: string
  };
  custom_defaults: {
    html: string;
    js: string;
    css: string;
  };
  has_goal: boolean;
  show_bar: string;
}

export abstract class GenericGoalService extends WidgetSettingsService<IGoalData> {

  getMetadata() {
    return {

      title: metadata.text({
        title: $t('Title'),
        required: true,
        description: 'Some description here',
        tooltip: 'Some tooltip here',
        max: 60
      }),

      goal_amount: metadata.number({
        title: $t('Goal Amount'),
        required: true,
        min: 1
      }),

      manual_goal_amount: metadata.number({
        title: $t('Starting Amount'),
        min: 0
      }),

      ends_at: metadata.text({
        title: $t('End After'),
        required: true,
        dateFormat: 'MM/DD/YYYY',
        placeholder:'MM/DD/YYYY'
      }),

      layout: metadata.list({
        options: [
          { title: 'Standard', value: 'standard' },
          { title: 'Condensed', value: 'condensed' }
        ]
      }),
      bar_thickness: metadata.slider({
        min: 32,
        max: 128,
        interval: 4
      })
    };
  }

  protected patchAfterFetch(data: IGoalData): IGoalData {
    // fix a bug when API returning an empty array instead of null
    if (Array.isArray(data.goal)) data.goal = null;
    return data;
  }

}
