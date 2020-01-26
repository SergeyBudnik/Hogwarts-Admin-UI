import {
  TranslationAgeService, TranslationCabinetTypeService,
  TranslationDayOfWeekService,
  TranslationEducationLevelService,
  TranslationGroupTypeService,
  TranslationStudentAttendanceTypeService, TranslationStudentStatusTypeService, TranslationTimeService
} from '.';

export class TranslationService {
  public age(): TranslationAgeService {
    return new TranslationAgeService();
  }

  public cabinetType(): TranslationCabinetTypeService {
    return new TranslationCabinetTypeService();
  }

  public dayOfWeek(): TranslationDayOfWeekService {
    return new TranslationDayOfWeekService();
  }

  public educationLevel(): TranslationEducationLevelService {
    return new TranslationEducationLevelService();
  }

  public groupType(): TranslationGroupTypeService {
    return new TranslationGroupTypeService();
  }

  public studentAttendanceType(): TranslationStudentAttendanceTypeService {
    return new TranslationStudentAttendanceTypeService();
  }

  public studentStatusType(): TranslationStudentStatusTypeService {
    return new TranslationStudentStatusTypeService();
  }

  public time(): TranslationTimeService {
    return new TranslationTimeService();
  }
}