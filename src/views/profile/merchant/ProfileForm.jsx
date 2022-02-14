/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import TrashIcon from '../../../components/shared/customIcons/TrashIcon';
import AutoCompleteWrapper from '../../../components/shared/InputFields/AutoCompleteWrapper';
import Dropdown from '../../../components/shared/InputFields/DropDown';
import InputField from '../../../components/shared/InputFields/TextField';
import ModalWrapper from '../../../components/shared/modals/GenericModal';
import { defaultProfilePic } from '../../../constants/default';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import {
  addLane,
  deleteLane,
  deleteLogo,
  deleteProfilePicture,
  patchProfile,
  uploadLogo,
} from '../../../redux/actions/profileActions';
import { getSettings } from '../../../redux/selectors/accountSelector';
import { GET, PATCH } from '../../../services/api';
import ModalBody from '../patron/ModalBody';
import classes from '../patron/profile.module.scss';
import schema from './merchantProfileFormSchema';

const options = [
  {
    label: 'Mr',
    value: 'Mr',
  },
  {
    label: 'Ms',
    value: 'Ms',
  },
  {
    label: 'Miss',
    value: 'Miss',
  },
  {
    label: 'Mx',
    value: 'Mx',
  },
];

const laneRegex = /^\S+[A-Z_]{2,30}\S$/;
const specialtyRegex = /^\S+[A-Z_]{2,30}\S$/;

const ProfileForm = ({ defaultValues, flags }) => {
  const uploadRef = useRef(null);
  const uploadAlbum = useRef(null);
  const settings = useSelector(getSettings);
  const [shouldUpdateStateCity, setShouldUpdateStateCity] = useState(false);
  const [shouldUpdateLane, setShouldUpdateLane] = useState(false);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [lanesState, setLanesState] = useState(defaultValues?.lanes);
  const [logoState, setLogo] = useState(defaultValues.logo);
  const [albumImage, setAlbumImage] = useState('');
  const [album, setAlbum] = useState(defaultValues.album);
  const [openModal, setOpenModal] = useState(false);
  const [openAlbumModal, setOpenAlbumModal] = useState(false);
  const [selectedLane, setSelectedLane] = useState({});
  const [selectedSpecialty, setSelectedSpecialty] = useState({});
  const {
    handleSubmit,
    formState,
    control,
    setValue,
    setError,
    trigger,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...defaultValues,
      birthday: defaultValues.birthday
        ? new Date(defaultValues.birthday)
        : new Date(),
      city: defaultValues.city || '',
      zip: defaultValues.zip || '',
      state: defaultValues.state || '',
    },
    resolver: yupResolver(schema),
  });

  const shouldDisableDelete = () => {
    return logoState === defaultProfilePic;
  };

  const validateLane = (value) => {
    if (laneRegex.test(value)) {
      return true;
    }

    setError('lane', {
      type: 'Validation',
      message: 'Enter valid lane',
    });

    return false;
  };
  const validateSpecialty = (value) => {
    if (specialtyRegex.test(value)) {
      return true;
    }

    setError('specialty', {
      type: 'Validation',
      message: 'Enter valid specialty',
    });

    return false;
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAlbumModalClose = () => {
    setOpenAlbumModal(false);
  };

  const updateProfile = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const data = await dispatch(patchProfile(dispatch, payload));
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  const addLaneAndSpeciality = async () => {
    const isValidLane = validateLane(selectedLane?.title);
    const isValidSpecialty = () => {
      if (!selectedSpecialty?.title) {
        return true;
      }
      return validateSpecialty(selectedSpecialty?.title);
    };

    const request = {
      lane: selectedLane?.title,
      specialty: selectedSpecialty?.title,
    };
    if (request && isValidLane && isValidSpecialty() && flags.flag_allow_add) {
      const data = await dispatch(addLane(dispatch, request));
      if (data.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: data.error,
        });
      } else {
        setLanesState(data?.item?.lanes);
        setShouldUpdateLane(true);
        setModalVisible(false);
      }
    }
  };

  const deleteLaneAndSpeciality = async (item) => {
    setModalVisible(false);
    const request = { remove: item };

    if (request && flags.flag_allow_remove) {
      try {
        const data = await dispatch(deleteLane(dispatch, request));
        if (data.error) {
          setError(request, {
            type: 'Submission',
            message: 'Error saving data',
          });
        } else if (data?.item?.lanes) {
          setLanesState(data?.item?.lanes);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('err : ', error);
      }
    }
  };

  const uploadFunction = async (payload) => {
    const data = await dispatch(
      uploadLogo(dispatch, { image: payload, type: 'logo' })
    );
    if (data.error) {
      setError('logo', {
        type: 'Submission',
        message: 'Error saving data',
      });
    }
    setLogo(data?.item?.logo);
    setOpenModal(false);
  };

  const uploadAlbumFunction = async (payload) => {
    const data = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'image', {
        type: 'album',
        image: payload,
      })
    );

    if (data.error) {
      setError('logo', {
        type: 'Submission',
        message: 'Error saving data',
      });
    }
    if (!data?.error) {
      setAlbum(data.item.album);
      setOpenAlbumModal(false);
    }
  };

  const deleteFunction = async () => {
    const data = await dispatch(deleteLogo(dispatch, { url: logoState }));

    setLogo(data?.item?.logo);
    setAlbum([]);
    setOpenModal(false);
  };
  const deleteAlbumPhoto = async (item) => {
    const data = await dispatch(deleteProfilePicture(dispatch, { url: item }));

    setAlbum(data?.item?.album);
    setOpenModal(false);
  };

  const getDropDownOptions = (dropDownOptions) => {
    return dropDownOptions.map((option) => (
      <MenuItem
        key={`salutation-dropdown-${option.value}`}
        value={option.value}
      >
        {option.label}
      </MenuItem>
    ));
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result);
      setOpenModal(true);
      e.target.value = null;
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const onAlbumChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAlbumImage(reader.result);
      setOpenAlbumModal(true);
      e.target.value = null;
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };
  const resetZip = () => {
    setShouldUpdateStateCity(true);
    /*
     * NOTE: setValue didn't work inside async function.
     * So, added useEffect to set state and city.
     */
    // setValue('state', state);
    // setValue('city', city);
  };

  useEffect(() => {
    if (shouldUpdateStateCity) {
      setValue('state', defaultValues.state);
      setValue('city', defaultValues.city);

      setShouldUpdateStateCity(false);
    }
    return () => {};
  }, [shouldUpdateStateCity]);

  useEffect(() => {
    if (shouldUpdateLane) {
      setValue('lane', '');
      setValue('specialty', '');

      setShouldUpdateLane(false);
    }
    return () => {};
  }, [shouldUpdateLane]);

  const getSetting = async (zip) => {
    const result = await GET(`settings?type=zip&id=${zip}`);
    return result;
  };

  const onZipUpdate = async (field, payload) => {
    const isValid = await trigger(field);
    if (isValid) {
      const { item } = await getSetting(payload[field]);
      const isValidZip = !isEmpty(item);

      if (isValidZip) {
        await updateProfile('zip', {
          zip: payload[field],
          state: item.state,
          city: item.city,
        });
        resetZip(item.state, item.city);
      } else {
        setError('zip', {
          type: 'test',
          message: 'Invalid Zip',
        });
      }
    }
  };

  return (
    <div className={classes.profileFormWrapper}>
      <form id="profile_form_id" onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid container item justifyContent="flex-start" spacing={2}>
            <Grid className={classes.profileImageContainer} item sm={6} xs={6}>
              <div className={classes.profileImage}>
                <input
                  ref={uploadRef}
                  onChange={onChange}
                  style={{ display: 'none' }}
                  type="file"
                />

                <img alt="logo" height="200px" src={logoState} width="200px" />
                <IconButton
                  aria-label="close"
                  className={classes.profileImageAddIcon}
                  onClick={() => {
                    uploadRef.current.click();
                  }}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  aria-label="close"
                  className={classes.profileImageDeleteIcon}
                  disabled={shouldDisableDelete()}
                  onClick={deleteFunction}
                  size="small"
                >
                  <TrashIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <ModalWrapper handleClose={handleModalClose} isOpen={openModal}>
            <ModalBody
              defaultImage={defaultProfilePic}
              deleteFunction={deleteFunction}
              error={formState.errors.logo}
              handleClose={handleModalClose}
              isGrayScale={false}
              picture={logoState}
              uploadFunction={uploadFunction}
            />
          </ModalWrapper>
          <ModalWrapper
            handleClose={handleAlbumModalClose}
            isOpen={openAlbumModal}
          >
            <ModalBody
              aspectRatioX={800}
              aspectRatioY={600}
              defaultImage={defaultProfilePic}
              deleteFunction={deleteFunction}
              error={formState.errors.albumImage}
              handleClose={handleAlbumModalClose}
              isGrayScale
              picture={albumImage}
              uploadFunction={uploadAlbumFunction}
            />
          </ModalWrapper>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.businessName}
              fullWidth
              isPassword={false}
              label="Business Name"
              name="businessName"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              className={classes.aboutStyle}
              control={control}
              error={formState.errors.about}
              fullWidth
              isPassword={false}
              label="About"
              multiline
              name="about"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.website}
              fullWidth
              isPassword={false}
              label="Website (optional)"
              name="website"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid container item sm={12} xs={12}>
            <Grid className={classes.alignCenter} item sm={5} xs={6}>
              <div> Lanes & Specialties </div>
            </Grid>
            {/* <Grid style={{ display: 'flex', justifyContent: 'space-between' }}> */}
            <Grid
              className={classes.alignCenter}
              item
              justifyContent="center"
              sm={6}
              xs={4}
            >
              <hr className="mt-2" />
            </Grid>
            <Grid
              alignContent="center"
              container
              item
              justifyContent="flex-end"
              sm={1}
              xs={2}
            >
              <IconButton
                aria-label="close"
                onClick={() => {
                  setModalVisible(true);
                }}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid container>
              <Grid item sm={12} xs={12}>
                <div className={classes.lanesAndSpecs}>
                  {lanesState &&
                    lanesState.map((item) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <Grid className={classes.root}>
                          <Chip
                            className={classes.chip}
                            label={item}
                            onDelete={() => {
                              deleteLaneAndSpeciality(item);
                            }}
                            sm={8}
                            xs={8}
                          />
                        </Grid>
                      );
                    })}
                </div>
              </Grid>
            </Grid>
          </Grid>

          <ModalWrapper
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            isOpen={modalVisible}
          >
            <MuiDialogTitle disableTypography>
              <Typography variant="h6">Add Lane</Typography>
              <IconButton
                aria-label="close"
                className="margin-left-auto"
                onClick={() => setModalVisible(false)}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <DialogContent className="remove-side-padding">
              <Grid
                className={classes.gridRoot}
                container
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item sm={12} xs={12}>
                  <AutoCompleteWrapper
                    autoUpdate={false}
                    clearErrors={clearErrors}
                    control={control}
                    error={formState?.errors?.lane}
                    fullWidth
                    isUpdateOnBlur={false}
                    label="Lane"
                    name="lane"
                    options={Object.keys(settings?.lane || {}).map((lane) => ({
                      title: lane,
                    }))}
                    setValue={setSelectedLane}
                    value={selectedLane}
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <AutoCompleteWrapper
                    autoUpdate={false}
                    clearErrors={clearErrors}
                    control={control}
                    error={formState?.errors?.specialty}
                    fullWidth
                    isDisabled={!selectedLane?.title}
                    isUpdateOnBlur={false}
                    label="Specialty (Optional)"
                    name="specialty"
                    options={(
                      (settings?.lane && settings?.lane[selectedLane?.title]) ||
                      []
                    ).map((specialty) => ({
                      title: specialty,
                    }))}
                    setValue={setSelectedSpecialty}
                    value={selectedSpecialty}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="remove-side-padding">
              <Grid container justifyContent="flex-end">
                <Grid className={classes.buttonWrapper} item>
                  <Button
                    aria-label="log-out"
                    className={classes.iconButton}
                    disabled={!flags?.flag_allow_add}
                    onClick={() => addLaneAndSpeciality()}
                  >
                    <StandardIcon alt="upload" src={UploadIcon} />
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </ModalWrapper>
          <Grid item sm={4} xs={4}>
            <Dropdown
              control={control}
              error={formState.errors.salutation}
              fullWidth
              id="salutation"
              isMultiple={false}
              isUpdateOnBlur
              label="Salutation"
              name="salutation"
              updateFunction={updateProfile}
              variant="outlined"
            >
              {getDropDownOptions(options)}
            </Dropdown>
          </Grid>
          <Grid item sm={8} xs={8}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.firstName}
              fullWidth
              isPassword={false}
              label="First Name"
              name="firstName"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.lastName}
              fullWidth
              isPassword={false}
              label="Last Name"
              name="lastName"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.street}
              fullWidth
              isPassword={false}
              label="Street"
              name="street"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={6} xs={6}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.zip}
              fullWidth
              isPassword={false}
              label="ZIP"
              name="zip"
              updateFunction={onZipUpdate}
            />
          </Grid>
          <Grid item sm={6} xs={6}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.state}
              fullWidth
              isPassword={false}
              label="State"
              name="state"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.city}
              fullWidth
              isPassword={false}
              label="City"
              name="city"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid className={classes.alignCenter} item sm={2} xs={2}>
            <div> Album </div>
          </Grid>
          {/* <Grid style={{ display: 'flex', justifyContent: 'space-between' }}> */}
          <Grid
            className={classes.alignCenter}
            item
            justifyContent="center"
            sm={9}
            xs={8}
          >
            <hr className="mt-2" />
          </Grid>
          <Grid
            alignContent="center"
            container
            item
            justifyContent="flex-end"
            sm={1}
            xs={1}
          >
            <IconButton
              // className={classes.AddIcon}
              onClick={() => {
                uploadAlbum.current.click();
              }}
              size="small"
            >
              <AddIcon />
            </IconButton>
            <input
              ref={uploadAlbum}
              onChange={(e) => onAlbumChange(e)}
              style={{ display: 'none' }}
              type="file"
            />
          </Grid>

          {/* </Grid> */}

          <div className={classes.albumContainer}>
            {album &&
              album.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className={classes.albumImage}>
                  <IconButton
                    aria-label="close"
                    className={classes.deleteIcon}
                    onClick={() => deleteAlbumPhoto(item)}
                    size="small"
                  >
                    <TrashIcon />
                  </IconButton>

                  <img
                    alt="profileImage"
                    height="120px"
                    src={item}
                    width="120px"
                  />
                </div>
              ))}
          </div>
        </Grid>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  flags: PropTypes.shape({
    flag_allow_add: PropTypes.bool.isRequired,
    flag_allow_remove: PropTypes.bool.isRequired,
  }).isRequired,
  // eslint-disable-next-line no-dupe-keys
  defaultValues: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    album: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    lanes: PropTypes.array.isRequired,
    birthday: PropTypes.number.isRequired,
    cell: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    salutation: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileForm;
