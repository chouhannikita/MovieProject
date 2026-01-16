import React from "react";
import PropTypes from "prop-types";
import {
  BANK_FIELDS,
  CONTACT_FIELDS,
  ORGANISATION_FIELDS,
} from "@/app/admin/adminConfig";
import CustomButton from "@/components/custom-button/CustomButton";
import FormInput from "@/components/Form-Input/FormInput";

/* ---------- Reusable Input Renderer ---------- */

const RenderFields = ({ fields, values, onChange, grid }) => (
  <div className={`grid grid-cols-1 ${grid} gap-4`}>
    {fields.map(({ label, name, type = "text", required = false }) => (
      <FormInput
        key={name}
        label={label}
        name={name}
        type={type}
        required={required}
        value={values[name] || ""}
        onChange={onChange}
      />
    ))}
  </div>
);

RenderFields.propTypes = {
  fields: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  grid: PropTypes.string,
};

/* ---------- Main Component ---------- */

const GeneralInfo = ({ Section, accountInfo, setAccountInfo }) => {
  const { generalInfo } = accountInfo;

  const handleChange = ({ target: { name, value } }) => {
    setAccountInfo((prev) => ({
      ...prev,
      generalInfo: {
        ...prev.generalInfo,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <Section title="Organisation Details">
        <RenderFields
          fields={ORGANISATION_FIELDS}
          values={generalInfo}
          onChange={handleChange}
          grid="md:grid-cols-2"
        />

        <div className="mt-4">
          <FormInput
            label="Organisation / Individual Address"
            name="org_address"
            value={generalInfo.org_address || ""}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </div>
      </Section>

      <Section title="Contact Person Details">
        <RenderFields
          fields={CONTACT_FIELDS}
          values={generalInfo}
          onChange={handleChange}
          grid="md:grid-cols-3"
        />
      </Section>

      <Section title="Bank Details">
        <RenderFields
          fields={BANK_FIELDS}
          values={generalInfo}
          onChange={handleChange}
          grid="md:grid-cols-3"
        />
      </Section>

      <div className="flex justify-end mt-8">
        <CustomButton type="submit" variant="contained" buttonText="Proceed" />
      </div>
    </>
  );
};

GeneralInfo.propTypes = {
  Section: PropTypes.func.isRequired,
  accountInfo: PropTypes.shape({
    generalInfo: PropTypes.object.isRequired,
  }).isRequired,
  setAccountInfo: PropTypes.func.isRequired,
};

export default GeneralInfo;
