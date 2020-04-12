import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, AlertController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { UserProfile } from '../../model/userProfile.model'
import { Application } from '../../model/application.model'
import { Hours } from '../../model/hours.model'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemunerativeWork } from '../../model/remunerative_work.model';
import { ToastController } from 'ionic-angular';
import {UpdateApplication} from '../../model/updateapplication.model'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('mySlider') slides: Slides;
  public Application: Application
  public Hours: Hours
  public RemunerativeWork: RemunerativeWork
  public UpdateApplication:UpdateApplication
  private userForm: FormGroup;
  currentLoggedIn = new Array();
  id;
  firstname;
  surname;
  email;
  persal_number;
  tel_number;
  cell_number;
  application_date
  id_number;
  user_role_id;
  branch_id;
  department_id;
  job_title_id;
  designation_id;
  postal_code;
  postal_address;
  job_functions;
  unit_id;
  jobDescription;
  status_id;
  created_id;
  jobTitle
  branchDescription;
  work_category_id
  nature_of_work
  start_date
  end_date
  mon_start_hours
  mon_end_hours
  tue_start_hours
  tue_end_hours
  wed_start_hours
  wed_end_hours
  thu_start_hours
  thu_end_hours
  fri_start_hours
  fri_end_hours
  sat_start_hours
  sat_end_hours
  sun_start_hours
  sun_end_hours
  section_id
  total_working_hours
  remunerative_work_performed
  business_name
  reporting_person_surname
  reporting_person_initials
  contact_number;
  designated;
  departmentDescription;
  reporting_person_contact_number;
  unitDscritpion;
  application;
  originalListOfCsoes: UserProfile[] = [];
  filteredListOfCsoes: UserProfile[] = [];
  listOriginalLookupDistrict = [];
  listFilteredLookupDistrict = [];
  listOriginalLookupMunicipality = [];
  listFilteredLookupMunicipality = [];
  listFilteredLookupJob = [];
  listFilteredLookupDesignated = [];
  listFilteredLookupWorkCategory = [];
  listFilteredLookupWorkStatus = [];
  showQuestions: boolean = false;
  showQuestions2: boolean = false;
  date;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public verifyLogin: ServiceProvider,
    public navParams: NavParams,
    public service: ServiceProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {


    this.currentLoggedIn.push(this.navParams.get('orgObject'));

    console.log(this.id)

    this.date = new Date().toISOString()
    // this.date='DD/MM/YYY'
    console.log(this.date)

    this.id = this.currentLoggedIn[0][0].id
    this.firstname = this.currentLoggedIn[0][0].firstname
    this.surname = this.currentLoggedIn[0][0].surname
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email
    this.getUserProfile();
    this.getWorkCategory();
    this.getApplicationStatusMethod();
    this._buildForm();
    this.getApplication();
    // this.formSubmit();


  }


  getApplication(){
    // this.service.getApplication().subscribe(_response => {
    //   console.log( _response)
    //   this.application =_response.id
    // })
  }

  moveToNext() {
    this.slides.slideNext();
  }

  getUserProfile() {
    this.verifyLogin.getUserProfile(this.id).subscribe((_responseData) => {
      this.originalListOfCsoes = _responseData;
      this.filteredListOfCsoes = _responseData;
     
      this.created_id = _responseData.id
      this.firstname = _responseData.firstname
      this.surname = _responseData.surname
      this.persal_number = _responseData.persal_number
      this.tel_number = _responseData.tel_number
      this.cell_number = _responseData.cell_number
      this.id_number = _responseData.id_number
      this.branch_id = _responseData.branch_id
      this.department_id = _responseData.department_id
      this.job_title_id = _responseData.job_title_id
      this.postal_address = _responseData.postal_address
      this.designation_id = _responseData.designation_id
      this.unit_id = _responseData.unit_id
      this.postal_code = _responseData.postal_code
      // console.log(this.branch_id)
      console.log(_responseData)

      this.getBranch();
      this.getDepartment();
      this.getDesignation();
      this.getJob();
      this.getUnit();
      this.getHours()
    })
  }


  getBranch() {
    this.service.getBranch2(this.branch_id).subscribe(_responseDataBranch => {
      this.branchDescription = _responseDataBranch.description
      this.listFilteredLookupMunicipality = _responseDataBranch;
    })
  }


  getDepartment() {
    this.service.getDepartment2(this.department_id).subscribe(_responseDataDepartment => {
      this.departmentDescription = _responseDataDepartment.description
      this.listFilteredLookupDistrict = _responseDataDepartment


    })
  }
  getDesignation() {
    this.service.getDesignation2(this.designation_id).subscribe(_responseDataDesignation => {
      this.listFilteredLookupDesignated = _responseDataDesignation
      this.designated = _responseDataDesignation.designation
      // console.log(this.designated)
    })
  }

  getJob() {
    this.service.getJob2(this.job_title_id).subscribe(_responseDataJob => {
      this.jobDescription = _responseDataJob.description
      this.jobTitle = _responseDataJob.job_title
      this.listFilteredLookupJob = _responseDataJob
    })
  }


  getWorkCategory() {
    this.verifyLogin.getWorkCategory().subscribe(_responseDataCategory => {
      this.listFilteredLookupWorkCategory = _responseDataCategory
    })
  }
  getApplicationStatusMethod() {
    // this.verifyLogin.getApplicationStatus().subscribe(_responseDataStatus => {
    //   this.listFilteredLookupWorkStatus = _responseDataStatus
    // })
  }
  getHours() {
    this.verifyLogin.GetHours().subscribe(_responseDataHours => {
    })
  }


  getUnit() {
    this.verifyLogin.getUnit2(this.unit_id).subscribe(_responseDataUnit => {
      this.unitDscritpion = _responseDataUnit.description
    })
  }




  _buildForm() {
    this.userForm = this.formBuilder.group({
      'surname': ['', [Validators.required, Validators]],
      'firstname': ['', [Validators.required, Validators]],
      'email': ['', [Validators.required, Validators]],
      // 'unit_id': ['', [Validators.required, Validators]],
      'department_id': ['', [Validators.required, Validators]],
      'tel_number': ['', [Validators.required, Validators]],
      'id_number': ['', [Validators.required, Validators]],
      'branch_id': ['', [Validators.required, Validators]],
      'persal_number': ['', [Validators.required, Validators]],
      'job_functions': ['', [Validators.required, Validators]],
      'cell_number': ['', [Validators.required, Validators]],
      'postal_code': ['', [Validators.required, Validators]],
      'postal_address': ['', [Validators.required, Validators]],
      'status_id': ['', [Validators.required, Validators]],
      'current_working_hours': ['', [Validators.required, Validators]],
      'standby_duties_hours': ['', [Validators.required, Validators]],
      'current_overtime_hours_worked': ['', [Validators.required, Validators]],
      'work_category_id': ['', [Validators.required, Validators]],
      'nature_of_work': ['', [Validators.required, Validators]],
      'start_date': ['', [Validators.required, Validators]],
      'end_date': ['', [Validators.required, Validators]],
      'mon_start_hours': ['', [Validators.required, Validators]],
      'mon_end_hours': ['', [Validators.required, Validators]],
      'tue_start_hours': ['', [Validators.required, Validators]],
      'tue_end_hours': ['', [Validators.required, Validators]],
      'wed_start_hours': ['', [Validators.required, Validators]],
      'wed_end_hours': ['', [Validators.required, Validators]],
      'thu_start_hours': ['', [Validators.required, Validators]],
      'thu_end_hours': ['', [Validators.required, Validators]],
      'fri_start_hours': ['', [Validators.required, Validators]],
      'fri_end_hours': ['', [Validators.required, Validators]],
      'total_working_hours': ['', [Validators.required, Validators]],
      'remunerative_work_performed': ['', [Validators.required, Validators]],
      'business_name': ['', [Validators.required, Validators]],
      'reporting_person_surname': ['', [Validators.required, Validators]],
      'reporting_person_initials': ['', [Validators.required, Validators]],
      'contact_number': ['', [Validators.required, Validators]],
      'reporting_person_contact_number': ['', [Validators.required, Validators]],
      'choose': ['', [Validators.required, Validators]],

    });
  }




  formSubmit() {
  
    

    this.Hours = new Hours();
    this.Hours.current_working_hours = this.userForm.value.current_working_hours;
    this.Hours.standby_duties_hours = this.userForm.value.standby_duties_hours;
    this.Hours.current_overtime_hours_worked = this.userForm.value.current_overtime_hours_worked;


    this.RemunerativeWork = new RemunerativeWork();
    this.RemunerativeWork.work_category_id = this.userForm.value.work_category_id;
    this.RemunerativeWork.nature_of_work = this.userForm.value.nature_of_work;
    this.RemunerativeWork.start_date = this.userForm.value.start_date;
    this.RemunerativeWork.end_date = this.userForm.value.end_date;
    this.RemunerativeWork.mon_start_hours = this.userForm.value.mon_start_hours;
    this.RemunerativeWork.mon_end_hours = this.userForm.value.mon_end_hours;
    this.RemunerativeWork.tue_start_hours = this.userForm.value.tue_start_hours;
    this.RemunerativeWork.tue_end_hours = this.userForm.value.tue_end_hours;
    this.RemunerativeWork.wed_start_hours = this.userForm.value.wed_start_hours;
    this.RemunerativeWork.wed_end_hours = this.userForm.value.wed_end_hours;
    this.RemunerativeWork.thu_start_hours = this.userForm.value.thu_start_hours;
    this.RemunerativeWork.thu_end_hours = this.userForm.value.thu_end_hours;
    this.RemunerativeWork.fri_start_hours = this.userForm.value.fri_start_hours;
    this.RemunerativeWork.fri_end_hours = this.userForm.value.fri_end_hours;
    this.RemunerativeWork.total_working_hours = this.userForm.value.total_working_hours;
    this.RemunerativeWork.remunerative_work_performed = this.userForm.value.remunerative_work_performed;
    this.RemunerativeWork.business_name = this.userForm.value.business_name;
    this.RemunerativeWork.reporting_person_surname = this.userForm.value.reporting_person_surname;
    this.RemunerativeWork.reporting_person_initials = this.userForm.value.reporting_person_initials;
    this.RemunerativeWork.contact_number = this.userForm.value.contact_number;
    this.RemunerativeWork.reporting_person_contact_number = this.userForm.value.reporting_person_contact_number;


    this.UpdateApplication = new UpdateApplication
    // console.log(this.UpdateApplication)
    this.UpdateApplication.status_id = this.UpdateApplication.status_id;
    this.UpdateApplication.section_id = this.UpdateApplication.section_id;
    this.UpdateApplication.user_role_id = this.UpdateApplication.user_role_id;
    this.UpdateApplication.application_date = this.UpdateApplication.application_date;



    this.Application = new Application();
    // console.log(this.Application)
    this.Application.first_name = this.userForm.value.firstname;
    this.Application.surname = this.userForm.value.surname;
    this.Application.email = this.userForm.value.email;
    this.Application.department_id = this.userForm.value.department_id;
    this.Application.branch_id = this.userForm.value.branch_id;
    this.Application.office_phone_number = this.userForm.value.tel_number;
    this.Application.cellphone_number = this.userForm.value.cell_number;
    this.Application.id_number = this.userForm.value.id_number;
    this.Application.persal_number = this.userForm.value.persal_number;
    this.Application.job_functions = this.userForm.value.job_functions;
    this.Application.postal_address = this.userForm.value.postal_address;
    this.Application.postal_code = this.userForm.value.postal_code;
    // this.Application.user_id = this.userForm.value.user_id;
    this.Application.status_id = this.Application.status_id;
    console.log(this.id)
    this.Application.application_date = this.date
    this.Application.create_user_id = this.id;
    this.service.createApplication(this.Application).subscribe((_response: any) => {
      console.log(_response)
      this.Hours.application_id = _response.id
      this.service.createHours(this.Hours).subscribe((_response: any) => {
        console.log(_response)
        this.RemunerativeWork.application_id = this.application
        this.service.createRemunerativeWork(this.RemunerativeWork).subscribe((_response: any) => {
          const toast = this.toastCtrl.create({
            message: 'You have Successfully applied',
            duration: 4000
          });
          toast.present();
        });
      });
      this.UpdateApplication.id =  this.application
      this.UpdateApplication.status_id  =  this.UpdateApplication.status_id 
      this.service.Declaration(this.application).subscribe((_response)=>{
      console.log(_response)
      })
    });

  

  }
  _isInvalidControl(name: string) {
    return this.userForm.get(name).invalid && this.userForm.get(name).dirty;
  }

  AssessmentQuestions() {
    if (this.userForm.value.work_category_id == "28") {
      this.showQuestions = true;
      // console.log("show")
    }
    else {
      this.showQuestions = false
    }
  }
  Assessment(){
    if (this.userForm.value.choose == "1") {
      this.showQuestions2 = true;
      // console.log("show")
    }
    else {
      this.showQuestions2 = false
    }
  }


}
