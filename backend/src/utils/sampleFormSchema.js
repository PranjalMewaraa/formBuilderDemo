export const scribeRegistrationSchema = {
  title: 'Scribe Registration Form',
  sections: [
    {
      title: 'Aadhaar',
      fields: [
        {
          label: 'Aadhaar Number',
          name: 'aadhaarNumber',
          type: 'number',
          required: true,
          placeholder: 'Enter Aadhaar number',
          validation: {
            pattern: '^\\d{12,16}$',
            maxLength: 16,
            helperText: 'Enter 12 to 16 digits only.',
          },
        },
        {
          label: 'Verify Aadhaar',
          name: 'verifyAadhaar',
          type: 'number',
          required: true,
          placeholder: 'Re-enter Aadhaar number',
          matchWith: 'aadhaarNumber',
          validation: {
            pattern: '^\\d{12,16}$',
            maxLength: 16,
            helperText: 'This must match the Aadhaar number above.',
          },
        },
        {
          label: 'I consent to Aadhaar verification',
          name: 'aadhaarConsent',
          type: 'checkbox',
          required: true,
          validation: {
            helperText: 'Consent is mandatory to continue.',
          },
        },
      ],
    },
    {
      title: 'Personal Details',
      fields: [
        {
          label: 'Name',
          name: 'name',
          type: 'text',
          required: true,
          placeholder: 'Enter candidate name',
        },
        {
          label: 'Verify Name',
          name: 'verifyName',
          type: 'text',
          required: true,
          placeholder: 'Re-enter candidate name',
          matchWith: 'name',
        },
        {
          label: 'Name Changed',
          name: 'nameChanged',
          type: 'radio',
          required: true,
          options: ['yes', 'no'],
        },
        {
          label: 'New Name',
          name: 'newName',
          type: 'text',
          placeholder: 'Enter updated name',
          conditional: {
            field: 'nameChanged',
            value: 'yes',
          },
        },
      ],
    },
    {
      title: 'Basic Info',
      fields: [
        {
          label: 'Gender',
          name: 'gender',
          type: 'select',
          required: true,
          options: ['Male', 'Female', 'Other'],
        },
        {
          label: 'Father Name',
          name: 'fatherName',
          type: 'text',
          required: true,
        },
        {
          label: 'Mother Name',
          name: 'motherName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      title: 'Education',
      fields: [
        {
          label: 'Qualification',
          name: 'qualification',
          type: 'select',
          required: true,
          options: ['10th', '12th', 'Graduate', 'Post Graduate', 'Other'],
        },
        {
          label: 'Board',
          name: 'board',
          type: 'text',
          required: true,
        },
        {
          label: 'Roll Number',
          name: 'rollNumber',
          type: 'text',
          required: true,
        },
        {
          label: 'Year of Passing',
          name: 'yearOfPassing',
          type: 'number',
          required: true,
          validation: {
            pattern: '^(19|20)\\d{2}$',
            helperText: 'Enter a valid 4-digit passing year.',
          },
        },
      ],
    },
    {
      title: 'Contact',
      fields: [
        {
          label: 'Mobile',
          name: 'mobile',
          type: 'number',
          required: true,
          validation: {
            pattern: '^\\d{10}$',
            helperText: 'Enter a valid 10 digit mobile number.',
          },
        },
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          required: true,
          validation: {
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            helperText: 'Enter a valid email address.',
          },
        },
      ],
    },
    {
      title: 'Address',
      fields: [
        {
          label: 'Permanent Address',
          name: 'permanentAddress',
          type: 'textarea',
          required: true,
        },
        {
          label: 'State',
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          label: 'District',
          name: 'district',
          type: 'text',
          required: true,
        },
        {
          label: 'Pincode',
          name: 'pincode',
          type: 'number',
          required: true,
          validation: {
            pattern: '^\\d{6}$',
            helperText: 'Enter a valid 6 digit pincode.',
          },
        },
        {
          label: 'Is Present same?',
          name: 'isPresentSame',
          type: 'radio',
          required: true,
          options: ['yes', 'no'],
        },
        {
          label: 'Present Address',
          name: 'presentAddress',
          type: 'textarea',
          conditional: {
            field: 'isPresentSame',
            value: 'no',
          },
        },
      ],
    },
    {
      title: 'Uploads',
      fields: [
        {
          label: 'Photo',
          name: 'photo',
          type: 'file',
          required: true,
          validation: {
            accept: ['image/jpeg', 'image/jpg'],
            minSizeKb: 20,
            maxSizeKb: 50,
            helperText: 'Upload a JPG photo between 20KB and 50KB.',
          },
        },
        {
          label: 'Signature',
          name: 'signature',
          type: 'file',
          required: true,
          validation: {
            accept: ['image/jpeg', 'image/jpg'],
            minSizeKb: 10,
            maxSizeKb: 20,
            helperText: 'Upload a JPG signature between 10KB and 20KB.',
          },
        },
      ],
    },
    {
      title: 'Declaration',
      fields: [
        {
          label: 'I hereby declare that all details submitted are correct.',
          name: 'declaration',
          type: 'checkbox',
          required: true,
          validation: {
            helperText: 'Please accept the declaration before submission.',
          },
        },
      ],
    },
  ],
};
